var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const propertyDetailSchema = new Schema({
    /* GENERAL */
    area: Number,
    bedrooms: Number,
    garages: Number,
    near_metro: Boolean,
    accept_pets: Boolean,
    furnished: Boolean,
    type: typeProperty,
    availability: availabilityProperty,

    /* CHARACTERISTICS */
    color: String,
    pool: Boolean,
    Access_without_steps: Boolean,
    Penthouse_apartment: Boolean,
    big_windows: Boolean,
    new_or_retired: Boolean,
    silent_Street: Boolean,
    morning_sun: Boolean,
    afternoon_sun: Boolean,
    free_view: Boolean,

    /* ITENS PROPERTY */
    air_conditioning: Boolean,
    bathtub: Boolean,
    service_bathroom: Boolean,
    glass_box: Boolean,
    barbecue_grill: Boolean,
    gas_shower: Boolean,
    electric_shower: Boolean,
    light_curtain: Boolean,
    translucent_curtain: Boolean,
    electronic_lock: Boolean,
    anti_noise_window: Boolean,
    private_pool: Boolean,
    service_room: Boolean,
    extra_reversible_room: Boolean,
    tank: Boolean,
    window_screens: Boolean,
    pin_socket_3: Boolean,
    clothesline: Boolean,
    gourmet_balcony: Boolean,
    ceiling_fan: Boolean,

    /* CONDOMINIUM FACILITIES */
    academy: Boolean,
    barbecue: Boolean,
    elevator: Boolean,
    gourmet_space_common_area: Boolean,
    laundry_building: Boolean,
    swimming_pool: Boolean,
    playground: Boolean,
    ordinance_24h: Boolean,
    sports_court: Boolean,
    ballroom: Boolean,
    sauna: Boolean,

    /* FURNITURE */
    kitchen_cabinets: Boolean,
    lockers_room: Boolean,
    bathroom_cabinets: Boolean,
    double_bed: Boolean,
    single_bed: Boolean,
    mirror_bathroom: Boolean,
    table_and_chairs: Boolean,
    sofa: Boolean,
    television: Boolean,
    cookware: Boolean,

    /* HOME APPLIANCES */
    coffee_maker: Boolean,
    stove: Boolean,
    cooktop_stove: Boolean,
    refrigerator: Boolean,
    microwave: Boolean,
    washing_machine: Boolean,
    machine_washes_and_dries: Boolean,
    dryer: Boolean,

}, { versionKey: false });

module.exports = mongoose.model("PropertyDetail", propertyDetailSchema);