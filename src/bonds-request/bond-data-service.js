/**
 * Service which provide fetching and caching data (but only in current script memory stack)
 * Warning: you need to import http library to make service working
 *
 */
const BondDataService = {
    data: {},
    getItem(key) {
        return this.data[key];
    },
    setItem(key, data) {
        this.data[key] = data;
    },

    /**
     * Get numeric hash code by given params
     * @param {String} date - bond date in YYYYMMDD format
     * @param {Array.<String>} isins - array of isin codes
     * @returns {Number}
     */
    getHash(date, isins) {
        let hash = 0;
        const str = date + isins.sort().toString();
        for (let i = 0, len = str.length, char; i < len; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    },

    /**
     * Fetch bonds data
     * @param {String} date - bond date in YYYYMMDD format
     * @param {Array.<String>} isins - array of isin codes
     * @returns {Promise<Array.<Object> | undefined>}
     */
    async getBonds(date, isins) {
        if (!date || !Array.isArray(isins) || isins.length === 0) {
            return;
        }
        const hashCode = this.getHash(date, isins);
        const data = this.getItem(hashCode);
        if (data) {
            return data;
        } else {
            let response;
            try {
                response = await http.post({
                    url: `/bonds/${date}`,
                    body: isins
                });
                this.setItem(hashCode, response);
            } catch (error) {
                console.log('Failed to fetch', error);
            }
            return response;
        }
    }
};

export default BondDataService;
