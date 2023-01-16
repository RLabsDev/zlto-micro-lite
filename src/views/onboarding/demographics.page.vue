<style>
.form-element {
  padding: 5px;
}

.label {
  margin-bottom: 0;
  font-weight: bold;
  font-size: 14px;
  color: #212427;
}

.sub-label {
  margin-bottom: 0;
  font-size: 10px;
  color: #212427;
}

.form-btn {
  font-weight: 500;
  color: #fff;
  background-color: #fdb417;
  border-color: #fdb417;
  width: 100%;
  height: 47px;
}

.form-btn-profile {
  font-weight: 500;
  font-size: 12px;
  width: 100%;
}

.info-banner {
  background-color: #fff7e7;
  color: #fdb417;
  padding: 5px;
  border-radius: 10px;
  margin-top: 15px;
}
</style>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row">
      <div class="col-12">
        <p class=lable>When is your birthday?</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Enter your birthday.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          outlined
          v-model="demographicsForm.dob"
          type="date"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class=lable>What's is your ID number?</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Enter your real ID number.</p>
      </div>
      <div class="col-12">
        <div class="info-banner">
          <q-icon name="bi-info-circle" /> We do not share your personal
          information with any third parties.
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          outlined
          v-model="demographicsForm.id_number"
          label="ID Number *"
          lazy-rules
          mask="#############"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class=lable>What is your gender?</p>
      </div>
      <div class="col-12">
        <p class="sub-label">
          Select other if your would rather add your gender.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="q-gutter-sm">
          <q-radio v-model="demographicsForm.gender" val="Male" label="Male" />
          <q-radio v-model="demographicsForm.gender" val="Female" label="Female" />
          <q-radio v-model="demographicsForm.gender" val="Prefer not to answer" label="Prefer not to answer" />
        </div>
      </div>
      <div class="form-element col-12">
        <q-input
          outlined
          v-model="demographicsForm.gender_other"
          label="Other *"
          lazy-rules
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class=lable>Where do you stay?</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Enter your country and postal code.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-6">
        <q-select outlined v-model="demographicsForm.country_of_residence" :options="countries" label="Country *"/>
      </div>
      <div class="form-element col-6">
        <q-input outlined v-model="demographicsForm.postal_code"  label="Postal Code *" lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"  mask="####">
      </q-input>
      </div>
    </div>
    <div class="row flex-center">
        <!-- <div class="form-element  col-6">
        <q-btn outline rounded color="primary" class="form-btn-profile" label="Add profile picture"/>
        </div> -->
        <!-- <q-file filled bottom-slots v-model="demographicsForm.profile_picture" label="Profile Picture" counter>
        <template v-slot:prepend>
          <q-icon name="bi-cloud-arrow-up-fill" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon name="bi-x-lg" @click.stop.prevent="demographicsForm.profile_picture = null" class="cursor-pointer" />
        </template>
      </q-file> -->
      <!-- <div class="form-element offset-5 col-3">
      <q-uploader
        :files="demographicsForm.profile_picture"
        label="Profile Picture"
        color="primary"
        square
        flat
        bordered
        style="max-width: 100%"
      />
</div> -->
    </div>
    <div class="row">
      <div class="button-wrapper col-12">
        <q-btn
        unelevated 
        :no-caps="true"
          class="form-btn"
          label="Almost there!"
          type="submit"
          color="primary"
        />
      </div>
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";


const router = useRouter();
const userStore = useUserStore();
const demographicsForm = reactive({
  dob: "",
  id_number: "",
  gender: "",
  gender_other: "",
  country_of_residence: "South Africa",
  postal_code: "",
  profile_picture: null
});


// All countries
// length 252
var countries = [
    "Afghanistan",
    "Aland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, Democratic Republic of the Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D'Ivoire",
    "Croatia",
    "Cuba",
    "Curacao",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and Mcdonald Islands",
    "Holy See (Vatican City State)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran, Islamic Republic of",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, Democratic People's Republic of",
    "Korea, Republic of",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macedonia, the Former Yugoslav Republic of",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territory, Occupied",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Barthelemy",
    "Saint Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Serbia and Montenegro",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan, Province of China",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Virgin Islands, British",
    "Virgin Islands, U.s.",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

function onSubmit() {
  console.log(
    demographicsForm.dob,
    demographicsForm.id_number,
    demographicsForm.gender,
    demographicsForm.gender_other,
    demographicsForm.country_of_residence,
    demographicsForm.postal_code
  );
  userStore.onboaringAccountInfo.dob = demographicsForm.dob;
  userStore.onboaringAccountInfo.id_number = demographicsForm.id_number;
  userStore.onboaringAccountInfo.gender =
    demographicsForm.gender_other !== ""
      ? demographicsForm.gender_other
      : demographicsForm.gender;
  userStore.onboaringAccountInfo.country_of_residence = demographicsForm.country_of_residence;
  userStore.onboaringAccountInfo.postal_code = demographicsForm.postal_code;
  router.push({ name: "CreatePassword" });
}
</script>
