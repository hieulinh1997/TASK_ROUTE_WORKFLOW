package com.task.route.workflow.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.task.route.workflow.model.WorkFlow;

public interface Repository extends JpaRepository<WorkFlow,Integer>{

	
	void save(List<WorkFlow> list);
	List<WorkFlow> findById(int seq);

	@Query("SELECT coalesce(max(e.workflow_id), 0) FROM WorkFlow e")
	int getMaxId();
	
	@Query("SELECT COUNT(*) FROM WorkFlow")
	int getTotal();
	
	
	@Query(value = "SELECT u FROM WorkFlow u ORDER BY workflow_id")
	List<WorkFlow> findAll();
	
}
