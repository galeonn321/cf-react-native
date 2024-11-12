export interface WatchProviders {
    id: number;
    results: Results;
}

export interface Results {
    AD: Ad;
    AE: AE;
    AG: Ad;
    AO: AE;
    AR: AE;
    AT: AE;
    AU: AE;
    AZ: AE;
    BA: Ad;
    BB: Ad;
    BE: AE;
    BF: AE;
    BG: AE;
    BO: AE;
    BR: AE;
    BS: Ad;
    BY: AE;
    BZ: AE;
    CA: AE;
    CH: AE;
    CI: Ad;
    CL: AE;
    CM: Ad;
    CO: AE;
    CR: AE;
    CV: AE;
    CY: AE;
    CZ: AE;
    DE: AE;
    DK: AE;
    DO: Ad;
    EC: AE;
    EE: AE;
    ES: AE;
    FI: AE;
    FJ: Ad;
    FR: AE;
    GB: AE;
    GG: Ad;
    GH: Ad;
    GQ: Ad;
    GR: AE;
    GT: AE;
    GY: Ad;
    HK: AE;
    HN: AE;
    HR: AE;
    HU: AE;
    ID: AE;
    IE: AE;
    IL: AE;
    IN: AE;
    IS: AE;
    IT: AE;
    JM: Ad;
    JP: AE;
    KE: Ad;
    KR: AE;
    LC: Ad;
    LT: AE;
    LU: AE;
    LV: AE;
    MC: Ad;
    MD: Ad;
    ME: Ad;
    MG: Ad;
    MK: Ad;
    ML: AE;
    MU: AE;
    MX: AE;
    MY: AE;
    MZ: AE;
    NE: Ad;
    NG: Ad;
    NI: AE;
    NL: AE;
    NO: AE;
    NZ: AE;
    PA: Ad;
    PE: AE;
    PG: AE;
    PH: AE;
    PK: Ad;
    PL: AE;
    PT: AE;
    PY: AE;
    RO: Ad;
    RS: Ad;
    SA: AE;
    SC: Ad;
    SE: AE;
    SG: AE;
    SI: AE;
    SK: AE;
    SM: Ad;
    SN: Ad;
    SV: Ad;
    TC: Ad;
    TD: Ad;
    TH: AE;
    TR: AE;
    TT: Ad;
    TW: AE;
    TZ: AE;
    UA: AE;
    UG: AE;
    US: AE;
    UY: Ad;
    VE: AE;
    ZA: AE;
    ZM: Ad;
    ZW: AE;
}

export interface Ad {
    link: string;
    flatrate: Flatrate[];
}

export interface Flatrate {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export interface AE {
    link: string;
    rent: Flatrate[];
    buy: Flatrate[];
    flatrate?: Flatrate[];
}
