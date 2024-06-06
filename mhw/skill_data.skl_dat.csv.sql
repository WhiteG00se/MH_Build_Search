SELECT
  a.id.replace(/ ^ \ d +: /, '') AS id,
  a.level,
  a.unlock_skill_1,
  a.unlock_skill_2,
  a.unlock_skill_3,
  a.unlock_skill_4,
  a.unlock_skill_5,
  a.unlock_skill_6
WHERE
  ! a.id.includes('Unavailable')