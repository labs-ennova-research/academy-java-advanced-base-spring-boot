package com.ennovaresearch.academy.basespringboot.service.algorithm;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Alberto Ielpo
 */
public class SudokuAlgorithm {
	/**
	 * This cell is resolved
	 * 
	 * @param {Number} value
	 * @returns
	 */
	private boolean isResolved(int value) {
		return value > 0;
	}

	/**
	 * Sudoku is completed
	 * 
	 * @param {[Number][Number]} source
	 * @returns
	 */
	public boolean isAllResolved(int[][] source) {
		for (int ii = 0; ii < 9; ii++) {
			for (int jj = 0; jj < 9; jj++) {
				if (!isResolved(source[ii][jj])) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Get all the value giving a rowNumber
	 * 
	 * @param {[Number][Number]} source
	 * @param {Number}           rowNumber
	 * @returns
	 */
	private int[] getValuesRow(int[][] source, int rowNumber) {
		return source[rowNumber];
	}

	/**
	 * Get all values giving a columnNumber
	 * 
	 * @param {[Number][Number]} source
	 * @param {Number}           columnNumber
	 * @returns
	 */
	private int[] getValuesColumn(int[][] source, int columnNumber) {
		int[] columnValues = new int[9];
		for (int ii = 0; ii < 9; ii++) {
			columnValues[ii] = source[ii][columnNumber];
		}
		return columnValues;
	}

	/**
	 * Get all the values of the square giving row and column
	 * 
	 * @param {[Number][Number]} source
	 * @param {Number}           rowNumber
	 * @param {Number}           columnNumber
	 * @returns
	 */
	private int[] getValuesSquare(int[][] source, int rowNumber, int columnNumber) {
		int[] squareValues = new int[9];
		int r = rowNumber - (rowNumber % 3);
		int c = columnNumber - (columnNumber % 3);

		for (int ii = 0, kk = 0; ii < 3; ii++) {
			for (int jj = 0; jj < 3; jj++, kk++) {
				squareValues[kk] = source[ii + r][jj + c];
			}
		}
		return squareValues;
	}

	/**
	 * 
	 * @param set
	 * @param stuff
	 */
	private void addStuffToSet(Set<Integer> set, int[] stuff) {
		for (int r : stuff) {
			if (r > 0)
				set.add(r);
		}
	}

	/**
	 * Validate the number that I guess
	 * 
	 * @param {[Number][Number]} source
	 * @param {Number}           rowNumber
	 * @param {Number}           columnNumber
	 * @param {Number}           guess
	 * @returns
	 */
	private boolean validate(int[][] source, int rowNumber, int columnNumber, int guess) {
		List<Integer> availableValues = new ArrayList<Integer>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9));
		int[] rowValues = this.getValuesRow(source, rowNumber);
		int[] columnValues = getValuesColumn(source, columnNumber);
		int[] squareValues = getValuesSquare(source, rowNumber, columnNumber);
		Set<Integer> allValues = new HashSet<Integer>();
		addStuffToSet(allValues, rowValues);
		addStuffToSet(allValues, columnValues);
		addStuffToSet(allValues, squareValues);
		allValues.forEach(v -> {
			if (availableValues.contains(v)) {
				availableValues.remove(v);
			}
		});

		if (availableValues.contains(guess)) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * 
	 * @param {[Number][Number]} source
	 * @returns
	 */
	public boolean solve(int[][] source) {
		for (int row = 0; row < 9; row++) {
			for (int column = 0; column < 9; column++) {
				if (!isResolved(source[row][column])) {
					for (int guess = 1; guess < 10; guess++) {
						if (this.validate(source, row, column, guess)) {
							source[row][column] = guess;
							if (solve(source)) {
								return true;
							} else {
								source[row][column] = 0;
							}
						}
					}
					return false;
				}
			}
		}
		return true;
	}
}
