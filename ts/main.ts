interface Skill {
	id: string
	level: number
	unlock_skill_1: string
	unlock_skill_2: string
	unlock_skill_3: string
	unlock_skill_4: string
	unlock_skill_5: string
	unlock_skill_6: string
}

const skillSearchInput = document.getElementById("skillSearch") as HTMLInputElement
const searchResults = document.getElementById("searchResults") as HTMLUListElement
const selectedSkills = document.getElementById("selectedSkills") as HTMLUListElement

let skillData: Skill[] = []
let selectedSkillIds: Set<string> = new Set()

// Function to fetch skill data from the server
async function fetchSkillData() {
	try {
		const response = await fetch("mhw/skill_data.skl_dat.csv.tsv.json")
		skillData = await response.json()
	} catch (error) {
		console.error("Error fetching skill data:", error)
	}
}

// Call fetchSkillData function to fetch skill data asynchronously
fetchSkillData().then(() => {
	// Event listener for skill search input
	skillSearchInput.addEventListener("input", () => {
		const query = skillSearchInput.value.toLowerCase()
		searchResults.innerHTML = "" // Clear previous search results

		// Get unique skill names from skill data
		const skillNames = new Set(skillData.map((skill) => skill.id.split(": ")[1]))

		// Filter skill names based on search query and display matching results
		skillNames.forEach((skillName) => {
			if (skillName.toLowerCase().includes(query)) {
				const li = document.createElement("li")
				li.className = "list-group-item bg-secondary text-light"

				const skillBox = document.createElement("div")
				skillBox.className = "skill-box"

				const skillNameElement = document.createElement("span")
				skillNameElement.textContent = skillName

				skillBox.appendChild(skillNameElement)

				li.appendChild(skillBox)
				searchResults.appendChild(li)

				// Event listener to add skill when clicked on search result
				li.addEventListener("click", () => {
					addSkill(skillName)
				})
			}
		})
	})
})

// Function to add a selected skill to the list of selected skills
function addSkill(skillName: string) {
	selectedSkillIds.add(skillName)
	const li = document.createElement("li")
	li.className = "list-group-item bg-secondary text-light"

	const skillBox = document.createElement("div")
	skillBox.className = "skill-box d-flex justify-content-between align-items-center"

	const skillNameElement = document.createElement("span")
	skillNameElement.textContent = skillName

	const radioBtnGroup = document.createElement("div")
	radioBtnGroup.className = "btn-group"

	// Filter skill data for selected skill name
	const levels = skillData.filter((skill) => skill.id.split(": ")[1] === skillName)
	// Create radio buttons for each level
	levels.forEach((level) => {
		const radioBtn = document.createElement("input")
		radioBtn.type = "radio"
		radioBtn.className = "btn-check"
		radioBtn.name = skillName // Use skill name as radio button group name
		radioBtn.value = level.level.toString()
		radioBtn.id = `btnradio-${skillName}-${level.level}` // Unique ID for each radio button

		const label = document.createElement("label")
		label.className = "btn btn-primary"
		label.textContent = level.level.toString()
		label.htmlFor = radioBtn.id // Link label to corresponding radio button

		// Event listener to select radio button when label is clicked
		label.addEventListener("click", () => {
			radioBtn.checked = true
		})

		radioBtnGroup.appendChild(radioBtn)
		radioBtnGroup.appendChild(label)
	})

	const removeButton = document.createElement("button")
	removeButton.className = "btn btn-danger btn-sm"
	removeButton.textContent = "x"
	removeButton.addEventListener("click", () => {
		selectedSkills.removeChild(li)
		selectedSkillIds.delete(skillName)
	})

	skillBox.appendChild(skillNameElement)
	skillBox.appendChild(radioBtnGroup)
	skillBox.appendChild(removeButton)

	li.appendChild(skillBox)
	selectedSkills.appendChild(li)
}
