import Mongoose, { Document, Schema } from "mongoose";
import { UserInterface } from "./UserModel";
import { ContractInterface } from "./ContractModel";

export interface PropertyInterface extends Document {
  details: {
    typeVal: string;
    area: Boolean;
    bedrooms: string;
    garages: string;
    nearSubway: Boolean;
    acceptPets: Boolean;
    furnished: Boolean;
    availability: string;
    valueLocation: Number;
  };
  address: {
    street: string;
    district: string;
    city: string;
    state: string;
    num: string;
    cep: string;
    compl: string;
  };
  images: [
    {
      name: string;
      path: string;
    }
  ];
  characteristics: {
    color: String;
    pool: Boolean;
    aws: Boolean; //Access_without_steps
    pa: Boolean; //Penthouse_apartment
    bw: Boolean; //big_windows
    nor: Boolean; //new_or_retired
    ss: Boolean; //silent_Street
    ms: Boolean; //morning_sun
    as: Boolean; //afternoon_sun
    fv: Boolean; //free_view
  };
  itens: {
    ac: Boolean; //air_conditioning
    bathtub: Boolean;
    sb: Boolean; //service_bathroom
    gb: Boolean; //glass_box
    bg: Boolean; //barbecue_grill
    gs: Boolean; //gas_shower
    es: Boolean; //electric_shower
    lc: Boolean; //light_curtain
    tc: Boolean; //translucent_curtain
    el: Boolean; //electronic_lock
    anw: Boolean; //anti_noise_window
    pp: Boolean; //private_pool
    sr: Boolean; //service_room
    err: Boolean; //extra_reversible_room
    tank: Boolean;
    ws: Boolean; //window_screens
    clothesline: Boolean;
    gbalcony: Boolean; //gourmet_balcony
    cf: Boolean; //ceiling_fan
  };
  facilities: {
    academy: Boolean;
    barbecue: Boolean;
    elevator: Boolean;
    gsca: Boolean; //gourmet_space_common_area
    lb: Boolean; //laundry_building
    spool: Boolean; //swimming_pool
    playground: Boolean;
    ord24h: Boolean; //ordinance_24h
    sc: Boolean; //sports_court
    ballroom: Boolean;
    sauna: Boolean;
  };
  furniture: {
    kc: Boolean; //kitchen_cabinets
    lr: Boolean; //lockers_room
    bc: Boolean; //bathroom_cabinets
    db: Boolean; //double_bed
    sd: Boolean; //single_bed
    mb: Boolean; //mirror_bathroom
    tec: Boolean; //table_and_chairs
    sofa: Boolean;
    tv: Boolean;
    cookware: Boolean;
  };
  homeAppliances: {
    cm: Boolean; //coffee_maker
    stove: Boolean;
    cs: Boolean; //cooktop_stove
    refrigerator: Boolean;
    microwave: Boolean;
    wm: Boolean; //washing_machine
    mwd: Boolean; //machine_washes_and_dries
    dryer: Boolean;
  };
  crBy: UserInterface;
  contract: ContractInterface;
};

const propertySchema = new Schema(
  {
    details: {
      typeVal: {
        type: String,
        required: true,
        enum: ["APARTMENT", "KITNET", "HOUSE", "CONDOMINIUM_HOUSE"],
      },
      area: {
        type: Boolean,
        required: true,
      },
      bedrooms: {
        type: String,
        required: true,
      },
      garages: {
        type: String,
        required: true,
      },
      nearSubway: {
        type: Boolean,
        required: true,
      },
      acceptPets: {
        type: Boolean,
        required: true,
      },
      furnished: {
        type: Boolean,
        required: true,
      },
      availability: {
        type: String,
        required: true,
        enum: ["WHATEVER", "SOON", "IMMEDIATE"],
      },
      valueLocation: {
        type: Number,
        required: true,
      },
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      num: {
        type: String,
        required: true,
      },
      cep: {
        type: String,
        required: true,
      },
      compl: {
        type: String,
      },
    },
    images: [
      {
        name: {
          type: String,
          required: true,
        },
        path: {
          type: String,
          required: true,
        },
      },
    ],
    characteristics: {
      color: String,
      pool: Boolean,
      aws: Boolean, //Access_without_steps
      pa: Boolean, //Penthouse_apartment
      bw: Boolean, //big_windows
      nor: Boolean, //new_or_retired
      ss: Boolean, //silent_Street
      ms: Boolean, //morning_sun
      as: Boolean, //afternoon_sun
      fv: Boolean, //free_view
    },
    itens: {
      ac: Boolean, //air_conditioning
      bathtub: Boolean,
      sb: Boolean, //service_bathroom
      gb: Boolean, //glass_box
      bg: Boolean, //barbecue_grill
      gs: Boolean, //gas_shower
      es: Boolean, //electric_shower
      lc: Boolean, //light_curtain
      tc: Boolean, //translucent_curtain
      el: Boolean, //electronic_lock
      anw: Boolean, //anti_noise_window
      pp: Boolean, //private_pool
      sr: Boolean, //service_room
      err: Boolean, //extra_reversible_room
      tank: Boolean,
      ws: Boolean, //window_screens
      clothesline: Boolean,
      gbalcony: Boolean, //gourmet_balcony
      cf: Boolean, //ceiling_fan
    },
    facilities: {
      academy: Boolean,
      barbecue: Boolean,
      elevator: Boolean,
      gsca: Boolean, //gourmet_space_common_area
      lb: Boolean, //laundry_building
      spool: Boolean, //swimming_pool
      playground: Boolean,
      ord24h: Boolean, //ordinance_24h
      sc: Boolean, //sports_court
      ballroom: Boolean,
      sauna: Boolean,
    },
    furniture: {
      kc: Boolean, //kitchen_cabinets
      lr: Boolean, //lockers_room
      bc: Boolean, //bathroom_cabinets
      db: Boolean, //double_bed
      sd: Boolean, //single_bed
      mb: Boolean, //mirror_bathroom
      tec: Boolean, //table_and_chairs
      sofa: Boolean,
      tv: Boolean,
      cookware: Boolean,
    },
    homeAppliances: {
      cm: Boolean, //coffee_maker
      stove: Boolean,
      cs: Boolean, //cooktop_stove
      refrigerator: Boolean,
      microwave: Boolean,
      wm: Boolean, //washing_machine
      mwd: Boolean, //machine_washes_and_dries
      dryer: Boolean,
    },
    crBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: "Contract",
    },
  },
  { timestamps: true }
);

export default Mongoose.model<PropertyInterface>("Property", propertySchema);
