const BASE_URL = "http://localhost:3000/api/users/";

/**
 * ajouter un utilisateur
 * @param {Object} userData
 * @returns {Promise<Object>} réponse du serveur
 */
export async function sendUserToBackEnd(userData:any) {
    try {
        const response = await fetch(`${BASE_URL}register`, {
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

/**
 * Récuperer un utilisateur par id
 * @param {string|number} userId
 * @returns {Promise<Object>}(l'utilisateur)
 */
export async function getUserById(userId: string | number) {
    try {
        const response = await fetch(`${BASE_URL}${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error( errorData.error || "Erreur du serveur")
        }
        return await response.json();

    } catch (e) {
        throw e;
    }
}

/**
 * supprimer un utilisateur par son id
 * @param {string|number} userId
 * @returns {Promise<Object>} réponse du serveur
 */
export async function deleteUser(emailSuppressor: string, emailToDelete: string) {
    try {
        const response = await fetch(`${BASE_URL}delete`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emailSuppressor, emailToDelete })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erreur serveur lors de la tentative de suppression")
        }

        return await response.json();


    } catch (e) {
        throw e;
    }
}

