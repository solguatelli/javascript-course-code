class DOMHelper {
    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }

    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(
            newDestinationSelector
        );
        destinationElement.append(element);
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }

    detach() {
        if (this.element) {
            this.element.remove();
            // this.element.parentElement.removeChild(this.element);
        }
    }

    attach() {
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? "afterbegin" : "beforeend",
            this.element
        );
    }
}

class Tooltip extends Component {
    constructor(closeNotifierFunction,text) {
        super();
        this.text = text
        this.closeNotifier = closeNotifierFunction;
        this.create();
    }

    closeTooltip = () => {
        this.detach();
        this.closeNotifier();
    };

    create() {
        const tooltipElement = document.createElement("div");
        tooltipElement.className = "card";
        tooltipElement.textContent = this.text;
        tooltipElement.addEventListener("click", this.closeTooltip);
        this.element = tooltipElement;
    }
}

class ProjectItem {
    hasActiveTooltip = false;

    constructor(id, updateProjectListsFunction, type) {
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
        this.connectDrag()
    }

    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        console.log(projectElement.dataset);
        let tooltipText = projectElement.dataset.extraInfo // an object that saves every data-* attribute of the
                                                           // DOMElement
        const tooltip = new Tooltip(() => {
            this.hasActiveTooltip = false;
        },tooltipText);
        tooltip.attach();
        this.hasActiveTooltip = true;
    }

    connectDrag(){
        const projectItemElement = document.getElementById(this.id);
        projectItemElement.addEventListener("dragstart",(event) => {
            event.dataTransfer.setData("text/plain",this.id)
            event.dataTransfer.effectAllowed = "move"
        })
        projectItemElement.addEventListener("dragend",event => {
            console.log(event) // nos muestra si el drop fue existoso o no
        })
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector(
            "button:first-of-type"
        );
        moreInfoBtn.addEventListener(
            "click",
            this.showMoreInfoHandler.bind(this)
        );
    }

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector("button:last-of-type");
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type === "active" ? "Finish" : "Activate";
        switchBtn.addEventListener(
            "click",
            this.updateProjectListsHandler.bind(null, this.id)
        );
    }

    update(updateProjectListsFn, type) {
        this.updateProjectListsHandler = updateProjectListsFn;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${this.type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(
                new ProjectItem(
                    prjItem.id,
                    this.switchProject.bind(this),
                    this.type
                )
            );
        }
        console.log(this.projects);
        this.connectDroppable()
    }

    // necesitamos evitar lo que hace el navegador por default que es
    // impedir el dragging

    connectDroppable(){
        const list = document.querySelector(`#${this.type}-projects ul`)
        list.addEventListener("dragenter",event => {
            if(event.dataTransfer.types[0] === "text/plain")
                event.preventDefault() /// *

        })

        list.addEventListener("dragover",event => {
            if(event.dataTransfer.types[0] === "text/plain") {
                list.parentElement.classList.add("droppable")
                event.preventDefault() /// *
            }
        })

        list.addEventListener("dragleave",event => {
            if(event.relatedTarget.closest(`#${this.type}-projects ul`) !== list)
                list.parentElement.classList.remove("droppable")
        })

        list.addEventListener("drop",event => {
            const projId= event.dataTransfer.getData("text/plain")
            if(this.projects.find(p => p.id === projId)){
                return
            }
            document.getElementById(projId).querySelector("button:last-of-type").click()
            list.parentElement.classList.remove("droppable")

        })
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        // const projectIndex = this.projects.findIndex(p => p.id === projectId);
        // this.projects.splice(projectIndex, 1);
        this.switchHandler(this.projects.find((p) => p.id === projectId));
        this.projects = this.projects.filter((p) => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectsList = new ProjectList("active");
        const finishedProjectsList = new ProjectList("finished");
        activeProjectsList.setSwitchHandlerFunction(
            finishedProjectsList.addProject.bind(finishedProjectsList)
        );
        finishedProjectsList.setSwitchHandlerFunction(
            activeProjectsList.addProject.bind(activeProjectsList)
        );
    }
}

App.init();

