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
                s.getSocialInstagram(), s.getSocialLinkedin(), s.getSocialYoutube()
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
    }
}
