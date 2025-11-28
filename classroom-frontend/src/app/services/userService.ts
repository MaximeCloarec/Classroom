const BASE_URL = "http://localhost:3000/api/users/";

/**
 * ajouter un utilisateur
 * @param {Object} userData
 * @returns {Promise<Object>} réponse du serveur
 */
export async function sendUserToBackEnd(userData:any) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Erreur serveur");
        }

        return await response.json()

    } catch (e) {
        throw e;
    }
}

/**
 * get un utilisateur
 * @param {Object} userData
 * @returns {Promise<Object>} réponse du serveur
 */
export async function getAllUsers() {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Erreur serveur");
        }

        return await response.json()

    } catch (e) {
        throw e;
    }
}