import bcryptjs from "bcryptjs";

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "hombre" | "mujer" | "kids" | "unisex" | "NA";
}

interface seedUser {
  email: string;
  name: string;
  password: string;
  roles: "admin" | "user" | "superAmind";
}

type ValidSizes =
  //camisa adulto
  | "CA_XS"
  | "CA_S"
  | "CA_M"
  | "CA_L"
  | "CA_XL"
  | "CA_XXL"
  | "CA_XXXL"
  | "NA"
  //camisa niino
  | "NC_4"
  | "NC_6"
  | "NC_8"
  | "NC_12"
  | "NC_14"
  //pantalon hombre
  | "HP_28"
  | "HP_30"
  | "HP_32"
  | "HP_34"
  | "HP_36"
  | "HP_38"
  //zapatos adulto
  | "ZA_36"
  | "ZA_37"
  | "ZA_38"
  | "ZA_39"
  | "ZA_40"
  | "ZA_41"
  | "ZA_42"
  | "ZA_43"
  //pantoalon mujer
  | "MP_4"
  | "MP_6"
  | "MP_8"
  | "MP_10"
  | "MP_12"
  | "MP_14"
  //pantalon ninos
  | "NC_4"
  | "NC_6"
  | "NC_8"
  | "NC_12"
  | "NC_14"
  //zapatos ninos
  | "NZ_28"
  | "NZ_29"
  | "NZ_30"
  | "NZ_31"
  | "NZ_32"
  | "NZ_33"
  | "NZ_34";

interface Sizes {
  size: ValidSizes;
}

type ValidTypes =
  | "camisa"
  | "pants"
  | "hoodies"
  | "hats"
  | "videojuegos"
  | "smartwatch"
  | "computadores";
type CategoryTypes =
  | "mujer"
  | "hombre"
  | "kids"
  | "hogar"
  | "tecnología"
  | "mascotas"
  | "Belleza y salud"
  | "otros";

interface SeedData {
  categorySize: CategorySize[];
  garmenttypes: Garmenttypes[];
  seedUser: seedUser[];
  categories: string[];
  subCategories: string[];
  products: SeedProduct[];
  camisaHombre: Sizes[];
  zapatosHombre: Sizes[];
  pantalonHombre: Sizes[];
  camisaMujer: Sizes[];
  zapatosMujer: Sizes[];
  pantalonMujer: Sizes[];

  camisaKids: Sizes[];
  pantalonKids: Sizes[];
  zapatosKids: Sizes[];
  noAplica: Sizes[];
 
}
 type CategorySize ="hombre"| "mujer"| "kids"| "NA";
 type Garmenttypes ="camisa"|"pantalon"|"zapatos"|"NA";
export const initialData: SeedData = {
  categorySize: ["hombre", "mujer", "kids", "NA"],
  garmenttypes: ["camisa", "pantalon", "zapatos", "NA"],
  categories: [
    "mujer",
    "hombre",
    "kids",
    "hogar",
    "tecnología",
    "mascotas",
    "Belleza y salud",
    "otros",
  ],
  subCategories: ["camisa"],
  camisaHombre: [
    {
      size: "CA_XS",
    },
    {
      size: "CA_S",
    },
    {
      size: "CA_M",
    },
    {
      size: "CA_L",
    },
    {
      size: "CA_XL",
    },
    {
      size: "CA_XXL",
    },
    {
      size: "CA_XXXL",
    },
  ],
  zapatosHombre: [
    {
      size: "ZA_36",
    },
    {
      size: "ZA_37",
    },
    {
      size: "ZA_38",
    },
    {
      size: "ZA_39",
    },
    {
      size: "ZA_40",
    },
    {
      size: "ZA_41",
    },
    {
      size: "ZA_42",
    },
    {
      size: "ZA_43",
    },
  ],
  pantalonHombre: [
    {
      size: "HP_28",
    },
    {
      size: "HP_32",
    },
    {
      size: "HP_34",
    },
    {
      size: "HP_36",
    },
    {
      size: "HP_38",
    },
  ],
  pantalonMujer: [
    {
      size: "MP_4",
    },
    {
      size: "MP_6",
    },
    {
      size: "MP_8",
    },
    {
      size: "MP_10",
    },
    {
      size: "MP_12",
    },
    {
      size: "MP_14",
    },
  ],
  camisaMujer: [
    {
      size: "CA_XS",
    },
    {
      size: "CA_S",
    },
    {
      size: "CA_M",
    },
    {
      size: "CA_L",
    },
    {
      size: "CA_XL",
    },
    {
      size: "CA_XXL",
    },
    {
      size: "CA_XXXL",
    },
  ],
  zapatosMujer: [
    {
      size: "ZA_36",
    },
    {
      size: "ZA_37",
    },
    {
      size: "ZA_38",
    },
    {
      size: "ZA_39",
    },
    {
      size: "ZA_40",
    },
    {
      size: "ZA_41",
    },
    {
      size: "ZA_42",
    },
    {
      size: "ZA_43",
    },
  ],
  camisaKids: [
    {
      size: "NC_4",
    },
    {
      size: "NC_6",
    },
    {
      size: "NC_8",
    },
    {
      size: "NC_12",
    },
    {
      size: "NC_14",
    },

  ],
  pantalonKids: [
    {
      size: "CA_S",
    },
    {
      size: "CA_M",
    },
    {
      size: "CA_L",
    },

  ],
  zapatosKids: [
    {
      size: "NZ_28",
    },
    {
      size: "NZ_29",
    },
    {
      size: "NZ_30",
    },
    {
      size: "NZ_31",
    },
    {
      size: "NZ_32",
    },
    {
      size: "NZ_33",
    },
    {
      size: "NZ_34",
    },

  ],
  noAplica:[
    {
      size:"NA"
    }
  ],

  products: [
    {
      description:
        "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
      images: ["1740250-00-A_0_2000.jpg", "1740250-00-A_1.jpg"],
      inStock: 10,
      price: 130,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_raven_lightweight_zip_up_bomber_jacket",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Raven Lightweight Zip Up Bomber Jacket",
      gender: "hombre",
    },

    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
      images: ["1740280-00-A_0_2000.jpg", "1740280-00-A_1.jpg"],
      inStock: 50,
      price: 45,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_turbine_long_sleeve_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Turbine Long Sleeve Tee",
      gender: "hombre",
    },
    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
      images: ["1741416-00-A_0_2000.jpg", "1741416-00-A_1.jpg"],
      inStock: 50,
      price: 40,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_turbine_short_sleeve_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Turbine Short Sleeve Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
      images: ["7654393-00-A_2_2000.jpg", "7654393-00-A_3.jpg"],
      inStock: 0,
      price: 35,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_cybertruck_owl_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Cybertruck Owl Tee",
      gender: "hombre",
    },
    {
      description:
        "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
      images: ["1703767-00-A_0_2000.jpg", "1703767-00-A_1.jpg"],
      inStock: 15,
      price: 35,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_solar_roof_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Solar Roof Tee",
      gender: "hombre",
    },
    {
      description:
        "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
      images: ["1700280-00-A_0_2000.jpg", "1700280-00-A_1.jpg"],
      inStock: 17,
      price: 35,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_let_the_sun_shine_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Let the Sun Shine Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
      images: ["8764734-00-A_0_2000.jpg", "8764734-00-A_1.jpg"],
      inStock: 12,
      price: 35,
      sizes:["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_3d_large_wordmark_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's 3D Large Wordmark Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
      images: ["7652426-00-A_0_2000.jpg", "7652426-00-A_1.jpg"],
      inStock: 5,
      price: 35,
      sizes:["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_3d_t_logo_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's 3D T Logo Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed for comfort and style in any size, the Tesla Small Wordmark Tee is made from 100% Peruvian cotton and features a 3D silicone-printed wordmark on the left chest.",
      images: ["8528839-00-A_0_2000.jpg", "8528839-00-A_2.jpg"],
      inStock: 2,
      price: 35,
      sizes:["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_3d_small_wordmark_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men’s 3D Small Wordmark Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
      images: ["1549268-00-A_0_2000.jpg", "1549268-00-A_2.jpg"],
      inStock: 82,
      price: 35,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_plaid_mode_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Plaid Mode Tee",
      gender: "hombre",
    },
    {
      description:
        "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any environment.",
      images: ["9877034-00-A_0_2000.jpg", "9877034-00-A_2.jpg"],
      inStock: 24,
      price: 35,
      sizes:["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_powerwall_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Powerwall Tee",
      gender: "hombre",
    },
    {
      description:
        "Inspired by Tesla Battery Day and featuring the unveiled tabless battery cell, Battery Day Tee celebrates the future of energy storage and cell manufacturing. Designed for fit, comfort and style, Battery Day Tee is made from 100% cotton with a stylized cell printed across the chest. Made in Peru.",
      images: ["1633802-00-A_0_2000.jpg", "1633802-00-A_2.jpg"],
      inStock: 5,
      price: 30,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_battery_day_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Battery Day Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed for exceptional comfort and inspired by the Cybertruck unveil event, the Cybertruck Bulletproof Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
      images: ["7654399-00-A_0_2000.jpg", "7654399-00-A_1.jpg"],
      inStock: 150,
      price: 30,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_cybertruck_bulletproof_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men’s Cybertruck Bulletproof Tee",
      gender: "hombre",
    },
    {
      description:
        "Inspired by the Model Y order confirmation graphic, the limited edition Haha Yes Tee is designed for comfort and style. Made from 100% Peruvian cotton and featuring the Tesla wordmark across the chest, the exclusive tee will commemorate your order for years to come.",
      images: ["7652410-00-A_0.jpg", "7652410-00-A_1_2000.jpg"],
      inStock: 10,
      price: 35,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_haha_yes_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Haha Yes Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed for fit, comfort and style, the limited edition S3XY Tee is made from 100% cotton with a 3D silicone-printed “S3XY” logo across the chest. Made in Peru. Available in black.",
      images: ["8764600-00-A_0_2000.jpg", "8764600-00-A_2.jpg"],
      inStock: 34,
      price: 35,
      sizes:["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_s3xy_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's S3XY Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D Wordmark Long Sleeve Tee is made from 100% cotton and features an understated wordmark logo on the left chest.",
      images: ["8764813-00-A_0_2000.jpg", "8764813-00-A_1.jpg"],
      inStock: 15,
      price: 40,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_3d_wordmark_long_sleeve_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's 3D Wordmark Long Sleeve Tee",
      gender: "hombre",
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D T Logo Long Sleeve Tee is made from 100% cotton and features an understated T logo on the left chest.",
      images: ["8529198-00-A_0_2000.jpg", "8529198-00-A_1.jpg"],
      inStock: 12,
      price: 40,
      sizes: ["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_3d_t_logo_long_sleeve_tee",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's 3D T Logo Long Sleeve Tee",
      gender: "hombre",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Men's Chill Full Zip Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
      images: ["1741111-00-A_0_2000.jpg", "1741111-00-A_1.jpg"],
      inStock: 100,
      price: 85,
      sizes:["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_chill_full_zip_hoodie",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Chill Full Zip Hoodie",
      gender: "hombre",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740140-00-A_0_2000.jpg", "1740140-00-A_1.jpg"],
      inStock: 7,
      price: 85,
      sizes:["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_chill_quarter_zip_pullover_-_gray",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Chill Quarter Zip Pullover - Gray",
      gender: "hombre",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740145-00-A_2_2000.jpg", "1740145-00-A_1.jpg"],
      inStock: 15,
      price: 85,
      sizes:["CA_M", "CA_L", "CA_XL", "CA_XXL"],
      slug: "men_chill_quarter_zip_pullover_-_white",
      type: "camisa",
      tags: ["camisa"],
      title: "Men's Chill Quarter Zip Pullover - White",
      gender: "hombre",
    },
  ],
  seedUser: [
    {
      name: "admin",
      email: "admin@gmail.com",
      password: bcryptjs.hashSync("123456"),
      roles: "admin",
    },
    {
      name: "user",
      email: "user@gmail.com",
      password: bcryptjs.hashSync("123456"),
      roles: "user",
    },
  ],
};
