const validation = (input) => {
    const errors = {};
    const regexTitle = /^[A-Za-z]+$/;

    if (input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = 'El HealthScore se tiene que encontrar entre 0 y 100.';
    }

    if (input.title.length > 0 && !regexTitle.test(input.title)) {
        errors.title = "El título solo puede contener letras.";
    }

    return errors;
}

export default validation;