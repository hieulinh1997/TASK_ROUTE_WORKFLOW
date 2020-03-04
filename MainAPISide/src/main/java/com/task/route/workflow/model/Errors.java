package com.task.route.workflow.model;

public class Errors {

	String err_cd;
	String err_msg;
	
	@Override
	public String toString() {
		return "Errors [err_cd=" + err_cd + ", err_msg=" + err_msg + "]";
	}
	
	
	public Errors(String err_cd, String err_msg) {
		super();
		this.err_cd = err_cd;
		this.err_msg = err_msg;
	}
	
	public String getErr_cd() {
		return err_cd;
	}
	public void setErr_cd(String err_cd) {
		this.err_cd = err_cd;
	}
	public String getErr_msg() {
		return err_msg;
	}
	public void setErr_msg(String err_msg) {
		this.err_msg = err_msg;
	}
	
}
