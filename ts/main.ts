// Define the structure of the armor data
interface Armor {
	name: string
	variant: string
	equid_slot: string
	defense: number
	fire_res: number
	water_res: number
	ice_res: number
	thunder_res: number
	dragon_res: number
	slot_count: number
	slot_1_size: number
	slot_2_size: number
	slot_3_size: number
	set_skill_1: string
	skill_1: string
	skill_1_level: number
	skill_2: string
	skill_2_level: number
	skill_3: string
	skill_3_level: number
}

// Global variables
let armorData: Armor[] = []
let selectedSkills: { skill: string; level: number }[] = []

// Load armor data from JSON file
fetch("MHW/armor.am_dat_full.csv.tsv.json")
	.then((response) => response.json())
	.then((data) => {
		armorData = data
		console.log("Armor data loaded:", armorData)
	})
	.catch((error) => console.error("Error loading armor data:", error))

// Handle search input
const searchInput = document.getElementById("skill-search") as HTMLInputElement
const searchResults = document.getElementById("search-results") as HTMLUListElement
const selectedSkillsList = document.getElementById("selected-skills") as HTMLUListElement

searchInput.addEventListener("input", () => {
	const query = searchInput.value.toLowerCase()
	searchResults.innerHTML = ""
	if (query) {
		const matchingSkills = armorData
			.flatMap((item) => [item.set_skill_1, item.skill_1, item.skill_2, item.skill_3])
			.filter((skill) => skill.toLowerCase().includes(query) && skill !== "0: --------")

		const uniqueSkills = Array.from(new Set(matchingSkills))
		uniqueSkills.forEach((skill) => {
			const listItem = document.createElement("li")
			listItem.className = "list-group-item d-flex justify-content-between align-items-center"
			listItem.textContent = skill
			const select = document.createElement("select")
			select.className = "form-select w-auto ms-3"
			for (let i = 0; i <= 7; i++) {
				const option = document.createElement("option")
				option.value = i.toString()
				option.textContent = i.toString()
				select.appendChild(option)
			}
			select.addEventListener("change", () => {
				addSelectedSkill(skill, parseInt(select.value, 10))
			})
			listItem.appendChild(select)
			searchResults.appendChild(listItem)
		})
	}
})

// Add selected skill to the list
function addSelectedSkill(skill: string, level: number) {
	selectedSkills.push({ skill, level })
	updateSelectedSkills()
}

// Remove selected skill from the list
function removeSelectedSkill(skill: string) {
	selectedSkills = selectedSkills.filter((s) => s.skill !== skill)
	updateSelectedSkills()
}

// Update selected skills list
function updateSelectedSkills() {
	selectedSkillsList.innerHTML = ""
	selectedSkills.forEach(({ skill, level }) => {
		const listItem = document.createElement("li")
		listItem.className = "list-group-item d-flex justify-content-between align-items-center"
		listItem.textContent = `${skill} (Level ${level})`
		const removeButton = document.createElement("button")
		removeButton.className = "btn btn-danger btn-sm ms-3"
		removeButton.textContent = "x"
		removeButton.addEventListener("click", () => {
			removeSelectedSkill(skill)
		})
		listItem.appendChild(removeButton)
		selectedSkillsList.appendChild(listItem)
	})
}
