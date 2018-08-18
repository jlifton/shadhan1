const Joi = require('joi');
const mongoose = require('mongoose');

const Single = mongoose.model('Single', new mongoose.Schema({
    identity: {
        firstName: {
            type: String,
            required: true,
            //minlength: 5,
            maxlength: 50
        },
        lastName: {
            type: String,
            required: true,
            //minlength: 2,
            maxlength: 64
        },
        sex: {
            type: String,
            enum : ['Male', 'Female'],
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: 16,
            max: 255
        },
        maritalStatus: {
            type: String,
            enum : ['Single','Divorced', 'Widowed'],
            required: true
        }
    },
    occupation: {
        type: String,
        max: 255,
        required: false
    },
    specialNeeds: {
        type: String,
        max: 255,
        required: false
    },
    religioEthnic: {
        hashkafa: {
            type: String,
            enum : ['Haredi', 'Dati Leumi', 'Hardal', 'Masorati'],
            required: true
        },
        ethnicity: {
            type: String,
            enum : ['Ashkenazi', 'Hasidish', 'Sefardi', 'Mixed'],
            required: true
        },
        ethnicityAdditional: {
            type: String,
            max: 255,
            required: false
        },
        convert: {
            type: Boolean,
            required: true
        },
        cohen: {
            type: Boolean,
            required: true
        },
        primaryActivity: {
            type: String,
            enum : ['Working', 'Learning', 'Koveah Itim', 'Other'],
            required: true
        }
    },
    residence: {
        city: {
            type: String,
            required: false,
            maxlength: 128
        },
        country: {
            type: String,
            required: false,
            maxlength: 128
        }
    },
    physical: {
        height: {
            type: Number,
            required: false,
            max: 300
        },
        build: {
            type: String,
            required: false,
            maxlength: 128
        },
        description: {
            type: String,
            required: false,
            maxlength: 255
        },
        smoker: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    personalityRequirements: {
        type: String,
        required: false,
        maxlength: 255
    },
    pastEducation: {
        type: String,
        required: false,
        maxlength: 255
    },
    contact: {
        name: {
            type: String,
            required: true,
            //minlength: 1,
            maxlength: 128
        },
        relationship: {
            type: String,
            required: false,
            maxlength: 128
        },
        primaryPhone: {
            type: String,
            required: true,
            //minlength: 3,
            maxlength: 64
        },
        secondaryPhone: {
            type: String,
            required: false,
            maxlength: 64
        },
        email: {
            type: String,
            required: false,
            maxlength: 128
        }
    },
    dateEntered: {
        type: Date,
        required: false,
        minlength: 3,
        maxlength: 128
    },
    source: {
        name: {
            type: String,
            required: false,
            maxlength: 128
        },
        email: {
            type: String,
            required: false,
            maxlength: 128
        },
        phone: {
            type: String,
            required: false,
            maxlength: 128
        }
    },
    visible: {
        type: Boolean,
        required: true,
        default: true
    },
    comments: {
        type: String,
        required: false,
        maxlength: 512
    },
    created: { type: Date
        //default: Date.now
    },
    updated: { type: Date,
        default: Date.now
    }
}));

const SingleGuest = mongoose.model('SingleGuest', new mongoose.Schema({
  identity: {
    firstName: {
      type: String,
      required: true,
      //minlength: 5,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      //minlength: 2,
      maxlength: 64
    },
    sex: {
      type: String,
      enum : ['Male', 'Female'],
      required: true
    },
    age: {
      type: Number,
      required: true,
      min: 16,
      max: 255
    },
    maritalStatus: {
      type: String,
      enum : ['Single','Divorced', 'Widowed'],
      required: true
    }
  },
  occupation: {
    type: String,
    max: 255,
    required: false
  },
  specialNeeds: {
    type: String,
    max: 255,
    required: false
  },
  religioEthnic: {
    hashkafa: {
      type: String,
      enum : ['Haredi', 'Dati Leumi', 'Hardal', 'Masorati'],
      required: true
    },
    ethnicity: {
      type: String,
      enum : ['Ashkenazi', 'Hasidish', 'Sefardi', 'Mixed'],
      required: true
    },
    ethnicityAdditional: {
      type: String,
      max: 255,
      required: false
    },
    convert: {
      type: Boolean,
      required: true
    },
    cohen: {
      type: Boolean,
      required: true
    },
    primaryActivity: {
      type: String,
      enum : ['Working', 'Learning', 'Koveah Itim', 'Other'],
      required: true
    }
  },
  residence: {
    city: {
      type: String,
      required: false,
      maxlength: 128
    },
    country: {
      type: String,
      required: false,
      maxlength: 128
    }
  },
  physical: {
    height: {
      type: Number,
      required: false,
      max: 300
    },
    build: {
      type: String,
      required: false,
      maxlength: 128
    },
    description: {
      type: String,
      required: false,
      maxlength: 255
    },
    smoker: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  personalityRequirements: {
    type: String,
    required: false,
    maxlength: 255
  },
  pastEducation: {
    type: String,
    required: false,
    maxlength: 255
  },
  contact: {
    name: {
      type: String,
      required: true,
      //minlength: 1,
      maxlength: 128
    },
    relationship: {
      type: String,
      required: false,
      maxlength: 128
    },
    primaryPhone: {
      type: String,
      required: true,
      //minlength: 3,
      maxlength: 64
    },
    secondaryPhone: {
      type: String,
      required: false,
      maxlength: 64
    },
    email: {
      type: String,
      required: false,
      maxlength: 128
    }
  },
  dateEntered: {
    type: Date,
    required: false,
    minlength: 3,
    maxlength: 128
  },
  source: {
    name: {
      type: String,
      required: false,
      maxlength: 128
    },
    email: {
      type: String,
      required: false,
      maxlength: 128
    },
    phone: {
      type: String,
      required: false,
      maxlength: 128
    }
  },
  visible: {
    type: Boolean,
    required: true,
    default: true
  },
  comments: {
    type: String,
    required: false,
    maxlength: 512
  },
  created: { type: Date
    //default: Date.now
  },
  updated: { type: Date,
    default: Date.now
  }
}));




function validateSingle(single) {
    /**
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(2).max(64).required()
        //isGold: Joi.boolean()
    };

    return Joi.validate(single, schema);
     **/
    return true;
}

exports.Single = Single;
exports.SingleGuest = SingleGuest;
exports.validate = validateSingle;
