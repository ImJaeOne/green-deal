import { supabase } from './client';

export const fetchUserData = async (userId) => {

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
};

export const checkNickname = async (nickname) => {
  const { data, error } = await supabase
    .from('users')
    .select('name')
    .eq('name', nickname);

  return { data, error };
};
