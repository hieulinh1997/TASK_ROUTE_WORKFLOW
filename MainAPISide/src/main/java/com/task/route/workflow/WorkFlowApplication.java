package com.task.route.workflow;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.task.route.workflow.dao.Repository;
import com.task.route.workflow.model.ResponeMeta;
import com.task.route.workflow.model.ResponseWhenAddAndUpdate;
import com.task.route.workflow.model.WorkFlow;

@Service
@SpringBootApplication
@RestController
@CrossOrigin(origins = "*")
public class WorkFlowApplication {

	@Autowired
	private Repository repository;
	
	@PostMapping("/api/v1/workflowroot")
	public ResponseWhenAddAndUpdate createWorkflow(@RequestBody List<WorkFlow> workFlow) {
		ResponseWhenAddAndUpdate res =  new ResponseWhenAddAndUpdate();
		System.out.println("routes: "+ workFlow.size());
		for (int i = 0; i < workFlow.size(); i++) {
			int getSeqRequest = workFlow.get(i).getSeq();
			System.out.println("getSeqRequest: " + getSeqRequest);
			if (getSeqRequest == 0) {
				repository.saveAll(workFlow);
				res.setStatus("success");
				
			} else {
				List<WorkFlow> wl = repository.findById(getSeqRequest);
//				
//				System.out.println("list: " + list);
				wl.get(0).setWorkflow_mei(workFlow.get(i).getWorkflow_mei());
				wl.get(0).setTekiyoukaishi_bi(workFlow.get(i).getTekiyoukaishi_bi());
				wl.get(0).setTekiyoushuryou_bi(workFlow.get(i).getTekiyoushuryou_bi());
				repository.saveAll(wl);
				res.setStatus("success");

			}
		}		
		return res;
	}
	
	// get all workflow
	@GetMapping("/api/v1/workflowroot")
	public ResponeMeta findAllRoutes() {
		ResponeMeta res = new ResponeMeta();
		try {		
			ArrayList<WorkFlow> list = (ArrayList<WorkFlow>) repository.findAll();
			res.setStatus("success");
//			res.setMaxWorkFlowID(repository.getMaxId());
//			res.setTotal(repository.getTotal());		
			res.setData(list);
		}catch(Exception e) {	
			res.setStatus("error");
			e.printStackTrace();
		}	
		return res;						
	}
	
	public static void main(String[] args) {
		SpringApplication.run(WorkFlowApplication.class, args);
	}

}
