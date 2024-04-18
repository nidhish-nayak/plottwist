import { createClient } from "@/utils/supabase/client"

export interface UpdateProfileProps {
	profileData: {
		name: string
		bio: string
		links: string[]
	}
	user_id: string
}

export async function updateProfile({
	profileData,
	user_id,
}: UpdateProfileProps) {
	console.log(profileData)
	console.log(user_id)

	const supabase = createClient()

	const { error } = await supabase
		.from("profiles")
		.update(profileData)
		.eq("user_id", user_id)

	if (error) {
		throw new Error(`Profile update failed: ${error.message}`)
	}

	return { message: "Profile updated successfully!" }
}