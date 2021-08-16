let state = {
  selectedVetID: null,
  selectedVet: null,
  vets: [],
  animals: []
}


fetch("http://localhost:3000/vets")
  .then((res) => res.json())
  .then((vets) => {
    console.log("Inside GET Fetch: ", vets);
    state.vets = vets
    console.log(state)
    // Do something with products
    renderVetList(state.vets)
  });

  const createVetForm = document.querySelector("#create-vet-form")
    console.log("query selector on form", createVetForm)

    function formInputListener() {
        createVetForm.addEventListener(`submit`, (e)=> {
        e.preventDefault()

        const firstName = document.querySelector("#first-name")
        const lastName = document.querySelector("#last-name")
        console.log(firstName.value, lastName.value)

        const newVet = {
            firstName: firstName.value,
            lastName: lastName.value
        }
          
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newVet)
          };

        fetch("http://localhost:3000/vets", fetchOptions)
        .then((res) => res.json())
        .then((newVet) => {
        console.log("Inside POST Fetch: ", newVet);
        state.vets.push(newVet)
        console.log("state", state)
        newVet.animals = []
        renderListAnimals([], newVet.id)
        // Do something with newVet
  
        renderVetList(state.vets)
        });

        console.log("first name", firstName.value, lastName.value)
        })
    }
    formInputListener()


  const vetListUl = document.querySelector(".vet-list")

  function renderVetList(vets) {

    vetListUl.innerHTML = ""

    for (let i = 0; i < vets.length; i++) {
        const vet = vets[i];
        console.log("inside for loop", vet)

        const vetListLi = document.createElement("li")
        vetListUl.append(vetListLi)

        const vetH3El = document.createElement("h3")
        vetListLi.append(vetH3El)
        vetH3El.innerText = vet.firstName + " " + vet.lastName
        
        const viewButton = document.createElement("button")
        vetListLi.append(viewButton)
        viewButton.innerText = `View`

        viewButton.addEventListener(`click`, ()=> {
          state.selectedVet = vet
          state.animals = vet.animals
          console.log("State View", state)
          renderListAnimals(vet.animals, vet.id)
          enableAnimalCreate()
        })
        }
      }

  function enableAnimalCreate() {
    animalCreateButton = document.querySelector("#animalSubmit")
    animalCreateButton.removeAttribute("disabled")
    console.log("animal create button ", animalCreateButton)
  }

const animalListUl = document.querySelector(".animal-list")

function renderListAnimals(animals, vetID) {

  animalListUl.innerHTML = ""
  state.selectedVetID = vetID
  state.animals = animals
  console.log("state object ", state)

    for (let i = 0; i < animals.length; i++) {
        const animal = animals[i];
        console.log("inside animal loop", animals)

        const animalLi = document.createElement("li")
        animalListUl.append(animalLi)
        animalLi.classList.add("animalLi")

        const animalName = document.createElement("h3")
        animalLi.append(animalName)
        animalName.innerText = animal.name
        animalName.classList.add("animal-h3")

        const animalType = document.createElement("p")
        animalLi.append(animalType)
        animalType.innerText = animal.type

        const microChip = document.createElement("p")
        animalLi.append(microChip)
        microChip.innerText = "Microchipped: " + animal.microchip

        const microchipYes = document.createElement("radio")
        animalLi.append(microchipYes)

    }
    
}

const createAnimalForm = document.querySelector("#create-animal-form")
    console.log("query selector on form", createAnimalForm)

    function createAnimalListener() {
        createAnimalForm.addEventListener(`submit`, (e)=> {
        e.preventDefault()

        const animalName = document.querySelector("#name")
        const type = document.querySelector("#type")
        // const microChippedNo = document.querySelector("#microchip-no")
        // const microChippedYes = document.querySelector("#microchip-yes")
        let selectedMicroChip = document.querySelector('input[type=radio][name=microchip]:checked')

        console.log(animalName.value, type.value, selectedMicroChip.value)

        const newAnimal = {
            name: animalName.value,
            type: type.value,
            microchip: selectedMicroChip.value,
            vetId: state.selectedVetID
        }
        console.log(newAnimal.name)
          
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newAnimal)
          };

        fetch("http://localhost:3000/Animals", fetchOptions)
        .then((res) => res.json())
        .then((newAnimal) => {
        console.log("Inside POST Fetch: ", newAnimal);

        // Do something with newAnimal
        });

        // console.log("first name", firstName.value, lastName.value)
        })
    }
    createAnimalListener()