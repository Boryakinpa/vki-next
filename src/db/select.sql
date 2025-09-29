-- Active: 1757427728965@@127.0.0.1@3306
SELECT 
  S.id, 
  S.first_name, 
  S.last_name, 
  S.middle_name, 
  G.name AS group_name 
FROM students S 
INNER JOIN [groups] G ON S.group_id == G.id