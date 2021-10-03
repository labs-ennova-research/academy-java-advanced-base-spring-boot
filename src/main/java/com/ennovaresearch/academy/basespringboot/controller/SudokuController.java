package com.ennovaresearch.academy.basespringboot.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ennovaresearch.academy.basespringboot.model.SudokuDto;
import com.ennovaresearch.academy.basespringboot.service.SudokuService;
/**
 * @author Alberto Ielpo
 */
@RestController
@RequestMapping("/api/sudoku")
//@CrossOrigin(origins = "http://localhost:1234")
public class SudokuController {

	private HttpHeaders httpHeaders;
	
	public SudokuController() {
		this.httpHeaders = new HttpHeaders();
		this.httpHeaders.setContentType(MediaType.APPLICATION_JSON);
	}
	
	@Autowired
	private SudokuService sudokuService;
	
	private int[][] convertListListToMatrix(List<List<Integer>> source){
		int[][] dest = new int[9][9];
		int ii = 0;
		int jj = 0;
		for(List<Integer> row : source) {
			jj=0;
			for(Integer column : row) {
				dest[ii][jj] = column;
				jj++;
			}
			ii++;
		}
		return dest;
	}
	
	private List<List<Integer>> convertMatrixToListList(int[][] source){
		List<List<Integer>> dest = new ArrayList<List<Integer>>();
		for(int ii=0; ii<9; ii++) {
			List<Integer> row = new ArrayList<Integer>();
			for(int jj=0; jj<9; jj++) {
				row.add(source[ii][jj]);
			}
			dest.add(row);
		}
		return dest;
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, path = "/solve", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String,Object>> solve(
    @RequestBody SudokuDto request) throws Exception {
		
		var sudoku = convertListListToMatrix(request.matrix);
		int[][] res = sudokuService.solve(sudoku);
		if(res == null) {
			return new ResponseEntity<Map<String,Object>>(new HashMap<String,Object>(), this.httpHeaders, HttpStatus.OK);	//+200
		} else {
			Map<String,Object> resMap = new HashMap<String,Object>();
			resMap.put("matrix", convertMatrixToListList(res));
			return new ResponseEntity<Map<String,Object>>(resMap, this.httpHeaders, HttpStatus.OK);	//+200
		}
	}
	
}
