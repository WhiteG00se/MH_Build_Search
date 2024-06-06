interface Skill {
	id: string
	level: number
	unlock_skill_1: string
	unlock_skill_2: string
	unlock_skill_3: string
	unlock_skill_4: string
	unlock_skill_5: string
	unlock_skill_6: string
	is_set_bonus: boolean
}

const skillSearchInput = document.getElementById("skillSearch") as HTMLInputElement
const searchResults = document.getElementById("searchResults") as HTMLUListElement
const selectedSkills = document.getElementById("selectedSkills") as HTMLUListElement

let skillData: Skill[] = []
let selectedSkillIds: Set<string> = new Set()

async function fetchSkillData() {
	try {
		const response = await fetch("mhw data/json/skills_joined.json")
		skillData = await response.json()
	} catch (error) {
		console.error("Error fetching skill data:", error)
	}
}
async function handleSkillSearchInput() {
	const query = skillSearchInput.value.toLowerCase()
	searchResults.innerHTML = ""

	const skillNames = Array.from(new Set(skillData.map((skill) => skill.id))).sort()

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

			li.addEventListener("click", () => {
				addSkill(skillName)
			})
		}
	})
}

async function addSkill(skillName: string) {
	if (selectedSkillIds.has(skillName)) {
		return
	}

	selectedSkillIds.add(skillName)
	const li = document.createElement("li")
	li.className = "list-group-item bg-secondary text-light"

	const skillBox = document.createElement("div")
	skillBox.className = "skill-box d-flex justify-content-between align-items-center"

	const skillNameElement = document.createElement("span")
	skillNameElement.textContent = skillName

	const radioBtnGroup = document.createElement("div")
	radioBtnGroup.className = "btn-group ms-auto"

	const defaultRadioBtn = document.createElement("input")
	defaultRadioBtn.type = "radio"
	defaultRadioBtn.className = "btn-check"
	defaultRadioBtn.name = skillName
	defaultRadioBtn.value = "0"
	defaultRadioBtn.id = `btnradio-${skillName}-0`

	const defaultLabel = document.createElement("label")
	defaultLabel.className = "btn btn-primary"
	defaultLabel.textContent = "0"
	defaultLabel.htmlFor = defaultRadioBtn.id

	defaultLabel.addEventListener("click", () => {
		defaultRadioBtn.checked = true
	})

	radioBtnGroup.appendChild(defaultRadioBtn)
	radioBtnGroup.appendChild(defaultLabel)

	const levels = skillData.filter((skill) => skill.id === skillName)
	levels.forEach((level) => {
		const radioBtn = document.createElement("input")
		radioBtn.type = "radio"
		radioBtn.className = "btn-check"
		radioBtn.name = skillName
		radioBtn.value = level.level.toString()
		radioBtn.id = `btnradio-${skillName}-${level.level}`

		const label = document.createElement("label")
		label.className = "btn btn-primary"
		label.textContent = level.level.toString()
		label.htmlFor = radioBtn.id

		label.addEventListener("click", () => {
			radioBtn.checked = true
		})

		radioBtnGroup.appendChild(radioBtn)
		radioBtnGroup.appendChild(label)
	})

	const removeButton = document.createElement("button")
	removeButton.className = "btn btn-danger btn-sm ms-2"
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

async function init() {
	await fetchSkillData()
	skillSearchInput.addEventListener("input", handleSkillSearchInput)
}

init()
