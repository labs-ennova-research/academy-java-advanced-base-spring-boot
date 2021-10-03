package com.ennovaresearch.academy.basespringboot.service;

import org.springframework.stereotype.Service;

import com.ennovaresearch.academy.basespringboot.service.algorithm.SudokuAlgorithm;

/**
 * @author Alberto Ielpo
 */
@Service
public class SudokuServiceImpl implements SudokuService {

	public int[][] solve(int[][] source){
		SudokuAlgorithm algorithm = new SudokuAlgorithm();
		algorithm.solve(source);
		if(algorithm.isAllResolved(source)) {
			return source;
		} else {
			return null;
		}
	}
}
