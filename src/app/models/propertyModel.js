var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const propertySchema = new Schema({
    details: {
        typeProperty: {
            type: String,
            required: true,
            enum: [ "APARTMENT", "KITNET", "HOUSE", "CONDOMINIUM_HOUSE" ]
        },
        area: {
            type: Boolean,
            required: true
        },
        bedrooms: {
            type: String,
            required: true
        },
        garages: {
            type: String,
            required: true
        },
        near_subway: {
            type: Boolean,
            required: true
        },
        accept_pets: {
            type: Boolean,
            required: true
        },
        furnished: {
            type: Boolean,
            required: true
        },
        availability: {
            type: String,
            required: true,
            enum: ["WHATEVER", "SOON", "IMMEDIATE"]
        }, 
        valueLocation: {
            type: Number,
            required: true
        }
    }, 
    address: {
        street: {
            type: String,
            required: true
        },
        neighborhoods: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        complement: {
            type: String
        }
    },
    images: [{
        name: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    }],
    characteristics: {
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
    }, 
    itens: {
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
    }, 
    facilities: {
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
    }, 
    furniture: {
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
    }, 
    homeAppliances: {
        coffee_maker: Boolean,
        stove: Boolean,
        cooktop_stove: Boolean,
        refrigerator: Boolean,
        microwave: Boolean,
        washing_machine: Boolean,
        machine_washes_and_dries: Boolean,
        dryer: Boolean,
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    contract: {
        type: Schema.Types.ObjectId, 
        ref: "Contract"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
}, { versionKey: false });

module.exports = mongoose.model("Property", propertySchema);