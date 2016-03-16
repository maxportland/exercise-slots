package com.rouxium.motiveone.model.factory;

import com.rouxium.motiveone.domain.entity.User;
import com.rouxium.motiveone.model.security.AuthenticationUser;
import org.springframework.security.core.authority.AuthorityUtils;

public class AuthenticationUserFactory {

    public static AuthenticationUser create(User user) {
        return new AuthenticationUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getLastPasswordReset(),
                AuthorityUtils.commaSeparatedStringToAuthorityList(user.getAuthorities())
        );
    }

}
