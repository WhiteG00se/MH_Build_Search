SELECT
  a.name,
  parseInt(a.rarity) + 1 AS rarity,
  a.equid_slot,
  a.defense,
  a.fire_res,
  a.water_res,
  a.ice_res,
  a.thunder_res,
  a.dragon_res,
  a.slot_count,
  a.slot_1_size,
  a.slot_2_size,
  a.slot_3_size,
  a.set_skill_1,
  a.skill_1,
  a.skill_1_level,
  a.skill_2,
  a.skill_2_level,
  a.skill_3,
  a.skill_3_level
WHERE
  (a.defense > 0 || a.type.toLowerCase() == 'charm') & & a.name != 'Unavailable' & & a.variant != 'low_rank'