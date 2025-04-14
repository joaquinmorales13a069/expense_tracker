export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if (!name) return "";
    
    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0].toUpperCase();
    }
    return initials;
}

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) {
        return ""
    }
    const [intergerPart, fractionalPart] = num.toString().split(".")
    const formattedInterger = intergerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInterger}.${fractionalPart}` : formattedInterger
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }))
    return chartData
}