interface TDate {
    calendar: {
        identifier: string;
    };
    day: number;
    era: string;
    month: number;
    year: number;
}
const dateToISo = (date: TDate) => {
    if (!date) {
        return new Date().toISOString();
    }
    return new Date(`${date?.month}-${date?.day}-${date?.year}`).toISOString();
};

export default dateToISo;