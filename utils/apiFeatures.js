class APIFeatures {
    constructor(query, queryString) {
        this.query = query; //User.find()
        this.queryString = queryString; //query field which will be added
    }

    filter() {
        const queryObj = {...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        //While filtering these fields are excluded for now
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        //Replace only gte with $gte and likewise

        this.query = this.query.find(JSON.parse(queryStr));


        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
            //__v field will be skipped 
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        //At which page number we are present currently
        const limit = this.queryString.limit * 1 || 100;
        //The limit of data to be present on each no of page
        const skip = (page - 1) * limit;
        //This amount of data will be skipped 
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}
export default APIFeatures;