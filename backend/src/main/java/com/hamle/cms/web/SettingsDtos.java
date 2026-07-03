package com.hamle.cms.web;

public class SettingsDtos {

    /** Genel API yanıtı + admin isteği (aynı düz alanlar). */
    public record SettingsPayload(
            String phoneDisplay,
            String phone,
            String whatsapp,
            String email,
            String addressStreet,
            String addressDistrict,
            String addressCity,
            String addressPostalCode,
            String addressCountry,
            String hours,
            String mapsQuery,
            String socialInstagram,
            String socialLinkedin,
            String socialYoutube,
            String siteTitle,
            String metaDescription,
            String keywords,
            String googleVerification,
            String ga4Id,
            String gtmId,
            String geoLat,
            String geoLng,
            String areaServed
    ) {}
}
