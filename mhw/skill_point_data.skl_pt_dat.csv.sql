SELECT
  a.name,
  a.is_set_bonus
WHERE
  ! a.name.includes('Unavailable')