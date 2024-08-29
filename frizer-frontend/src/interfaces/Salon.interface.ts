export interface Salon{
    id: number,
    name: string,
    description: string,
    location: string,
    city: string,
    phoneNumber: string,
    employeesIds: number[],
    salonTreatmentsIds: number[],
    tagsIds: number[],
    ownerId: number,
    backgroundImage: number | null,
    images: number[],
    rating: number,
    numberOfReviews: number,
    latitude: number,
    longitude: number
}