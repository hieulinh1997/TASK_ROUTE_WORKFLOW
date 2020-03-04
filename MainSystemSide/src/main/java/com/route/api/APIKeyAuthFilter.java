/*
 * @(#)[APIKeyAuthFilter].java [26/2/2020]
 * Product: [Route_ルート管理画面]
 * copyright(C) ivs.
*/

package com.route.api;

import javax.servlet.http.HttpServletRequest;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

/**
 * @author ivs
  */
public class APIKeyAuthFilter extends AbstractPreAuthenticatedProcessingFilter {

	private String principalRequestHeader;

	public APIKeyAuthFilter(String principalRequestHeader) {
		this.principalRequestHeader = principalRequestHeader;
	}

	@Override
	protected Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
		return request.getHeader(principalRequestHeader);
	}

	@Override
	protected Object getPreAuthenticatedCredentials(HttpServletRequest request) {
		return "N/A";
	}

}
