package com.hamle.cms.web;

import com.hamle.cms.domain.SiteSettings;
import org.springframework.stereotype.Component;

@Component
public class SettingsMapper {

    public SettingsDtos.SettingsPayload toResponse(SiteSettings s) {
        return new SettingsDtos.SettingsPayload(
                s.getPhoneDisplay(), s.getPhone(), s.getWhatsapp(), s.getEmail(),
                s.getAddressStreet(), s.getAddressDistrict(), s.getAddressCity(),
                s.getAddressPostalCode(), s.getAddressCountry(),
                s.getHours(), s.getMapsQuery(),
                s.getSocialInstagram(), s.getSocialLinkedin(), s.getSocialYoutube(),
                s.getSiteTitle(), s.getMetaDescription(), s.getKeywords(),
                s.getGoogleVerification(), s.getGa4Id(), s.getGtmId(),
                s.getGeoLat(), s.getGeoLng(), s.getAreaServed()
        );
    }

    public void apply(SettingsDtos.SettingsPayload r, SiteSettings s) {
        s.setPhoneDisplay(r.phoneDisplay());
        s.setPhone(r.phone());
        s.setWhatsapp(r.whatsapp());
        s.setEmail(r.email());
        s.setAddressStreet(r.addressStreet());
        s.setAddressDistrict(r.addressDistrict());
        s.setAddressCity(r.addressCity());
        s.setAddressPostalCode(r.addressPostalCode());
        s.setAddressCountry(r.addressCountry());
        s.setHours(r.hours());
        s.setMapsQuery(r.mapsQuery());
        s.setSocialInstagram(r.socialInstagram());
        s.setSocialLinkedin(r.socialLinkedin());
        s.setSocialYoutube(r.socialYoutube());
        s.setSiteTitle(r.siteTitle());
        s.setMetaDescription(r.metaDescription());
        s.setKeywords(r.keywords());
        s.setGoogleVerification(r.googleVerification());
        s.setGa4Id(r.ga4Id());
        s.setGtmId(r.gtmId());
        s.setGeoLat(r.geoLat());
        s.setGeoLng(r.geoLng());
        s.setAreaServed(r.areaServed());
    }
}
