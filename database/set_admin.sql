-- Este script redefine os níveis de acesso de todos os usuários.
-- Coloca o email oficial (vivendocomfibro2025@gmail.com) como 'admin'
-- e todos os outros usuários como 'member' (membros comuns).

UPDATE public.profiles
SET role = CASE 
    WHEN email = 'vivendocomfibro2025@gmail.com' THEN 'admin'
    ELSE 'member'
END;
