/*
* @(#)[APIKeyAuthFilter].java [26/2/2020]
* Product: [Route_ルート管理画面]
* copyright(C) ivs.
*/

package com.route.api;

import java.util.Arrays;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * Sau khi xác nhận được client có key
 * nhận các yêu cầu của client và gửi cho  MainAPI
 * 
 * @author ivs
 */
@RestController
public class RESTController {
	// URL MainAPI
	String URL_WORKFLOWROOT = "http://my-computer:9998/api/v1/workflowroot";

	// Post Workflow MainAPI
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping(value = "/api/v1/workflowroot", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String postWorkflowroot(@RequestBody String req) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);
		headers.setContentType(MediaType.APPLICATION_JSON);
		RestTemplate rtl = new RestTemplate();
		// data
		HttpEntity<String> requestBody = new HttpEntity<>(req, headers);
		// POST
		try {
			String s = rtl.postForObject(URL_WORKFLOWROOT, requestBody, String.class);
			return s;
		} catch (Exception e) {
			return "error: " + e;
		}
	}
	
	// Get Workflow MainAPI
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping(value = "/api/v1/workflowroot", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String getWorkflowroot(@RequestHeader Map<String, String> reqH) {
		reqH.forEach((key, val) -> {
			System.out.println(key + ":" + val);
		});
		try {
			// RestTemplate
			RestTemplate restTemplate = new RestTemplate();
			HttpHeaders headers = new HttpHeaders();
			// tra ve JSON
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.setAccept(Arrays.asList(new MediaType[] { MediaType.APPLICATION_JSON }));
			// result as String.
			HttpEntity<String> entity = new HttpEntity<String>(headers);
			// GET, va thong tin Headers.
			ResponseEntity<String> response = restTemplate.exchange(URL_WORKFLOWROOT, HttpMethod.GET, entity,
					String.class);
			String result = response.getBody();
			return result;
		} catch (Exception e) {
			return null;
		}
	}
}
