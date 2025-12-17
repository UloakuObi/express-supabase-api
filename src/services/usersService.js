import { supabase } from "../db/supabaseClient.js";

export const getAllUsersService = async () => {

    const { data, error } = await supabase
        .from("users")
        .select("*")

    if (error) throw error

    return data
}

export const getUserByIdService = async (id) => {
    
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)

    if (error) throw error

    return data
}

export const createUserService = async (name, email) => {

    const { data, error } = await supabase
        .from("users")
        .insert({ name, email })
        .select()

    if (error) throw error

    return data
}

export const updateUserService = async (id, name, email) => {

    const { data, error } = await supabase
        .from("users")
        .update({name, email})
        .eq("id", id)
        .select()
    
    if (error) throw error

    return data
}

export const patchUpdateUserService = async (id, updates) => {
    const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

    if (error) throw error

    return data
}

export const deleteUserService = async (id) => {

    const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", id)
        .select()
    
    if (error) throw error

    return data
}