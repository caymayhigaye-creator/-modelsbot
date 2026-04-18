const functions = {
    async generateKey() {
        const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
        const segmentLength = 5;
        const segments = 5; 
        let keyParts = [];

        for (let i = 0; i < segments; i++) {
            let segment = "";
            for (let j = 0; j < segmentLength; j++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                segment += charset[randomIndex];
            }
            keyParts.push(segment);
        }

        return keyParts.join('-');
    },
};


export {functions}