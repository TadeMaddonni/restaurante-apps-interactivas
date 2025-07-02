export const getAllPlates = async (categoryId) => {
    console.log('Category ID:', categoryId, 'Type:', typeof categoryId);
    
    // Validar que categoryId sea un número válido
    const validCategoryId = categoryId && !isNaN(categoryId) && categoryId > 0 ? categoryId : null;
    
    try {
        let response;
        if (validCategoryId) {       
            response = await fetch(`${import.meta.env.VITE_API_URL}/platos?categoria_id=${validCategoryId}`);
        } else {
            response = await fetch(`${import.meta.env.VITE_API_URL}/platos`);
        }

        const data = await response.json();

        if (response.ok) {
            // Asegurar que data sea un array
            const dishes = Array.isArray(data) ? data : (data.dishes || data.platos || []);
            return { success: true, dishes };
        } else {
            return { success: false, error: data };
        }
    } catch (error) {
        console.error('Error al obtener los platos:', error);
        return { success: false, error: error.message };
    }
};

export const getPlateById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/platos/${id}`);
        const data = await response.json();
        
        if (response.ok) {
            return { success: true, dish: data };
        } else {
            return { success: false, error: data };
        }
    } catch (error) {
        console.error('Error al obtener el plato:', error);
        return { success: false, error: error.message };
    }
};