/*
 * @(#)[APIKeyAuthFilter].java [26/2/2020]
 * Product: [Route_ルート管理画面]
 * copyright(C) ivs.
*/

package com.route.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;


/**
 * 
 * @author ivs
 */

@Configuration
@EnableWebSecurity
@Order
public class APISecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("test")
	private String principalRequestHeader;
	@Value("test")
	private String principalRequestValue;
	/**
	 * 
	 * @author ivs
	  */
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		APIKeyAuthFilter filter = new APIKeyAuthFilter(principalRequestHeader);
		filter.setAuthenticationManager(new AuthenticationManager() {

			@Override
			public Authentication authenticate(Authentication authentication) throws AuthenticationException {
				String principal = (String) authentication.getPrincipal();
				if (!principalRequestValue.equals(principal)) {
					throw new BadCredentialsException("The API key was not found or not the expected value.");
				}
				authentication.setAuthenticated(true);
				return authentication;
			}
		});
		httpSecurity.antMatcher("/api/**").csrf().disable().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().addFilter(filter).authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll().anyRequest().authenticated().and().httpBasic();

	}
}