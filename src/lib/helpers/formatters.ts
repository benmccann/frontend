// https://github.com/fram-x/assert-ts/issues/23
import { assert } from 'assert-ts';

/**
 * Convert number to thousands.
 *
 * No suffix added/
 *
 * @param n
 */
export function formatKilos(n: number): string {
	if (n <= 1000) {
		return (n / 1000).toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
	} else {
		return (n / 1000).toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
	}
}

/**
 * Format size in megabytes
 *
 * No suffix added.
 *
 * @param n
 */
export function formatSizeMegabytes(n: number): string {
	if (n <= 1024 * 1024) {
		return (n / (1024 * 1024)).toLocaleString('en', {
			minimumFractionDigits: 3,
			maximumFractionDigits: 3
		});
	} else {
		return (n / (1024 * 1024)).toLocaleString('en', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	}
}

/**
 * Format size in gigabyttes
 *
 * @param n
 */
export function formatSizeGigabytes(n: number): string {
	if (n <= 1024 * 1024) {
		return (n / (1024 * 1024 * 1024)).toLocaleString('en', {
			minimumFractionDigits: 3,
			maximumFractionDigits: 3
		});
	} else {
		return (n / (1024 * 1024 * 1024)).toLocaleString('en', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	}
}

/**
 * Format large money amounts in human friendly manner.
 *
 * Crypto prices can vary highly between $1B to $0.00000001.
 * Try to format everything gracefully.
 *
 * @param n
 * @param minFrag
 * @param maxFrag
 */
export function formatDollar(n: number, minFrag = 2, maxFrag = 2, prefix = '$'): string {
	if (n === undefined || n === null) {
		// Plz avoid ending here
		return '---';
	}

	if (n === 0) {
		return `${prefix}0`;
	}

	const absN = Math.abs(n);

	if (absN < 0.000001) {
		return (
			prefix +
			n.toLocaleString('en', {
				minimumFractionDigits: 10,
				maximumFractionDigits: 10
			})
		);
	} else if (absN < 0.0001) {
		return (
			prefix +
			n.toLocaleString('en', {
				minimumFractionDigits: 7,
				maximumFractionDigits: 7
			})
		);
	} else if (absN < 0.01) {
		// Format funny tokens
		return (
			prefix +
			n.toLocaleString('en', {
				minimumFractionDigits: 5,
				maximumFractionDigits: 5
			})
		);
	}

	if (absN >= 1000 * 1000 * 1000) {
		return (
			prefix +
			(n / (1000 * 1000 * 1000)).toLocaleString('en', {
				minimumFractionDigits: minFrag,
				maximumFractionDigits: maxFrag
			}) +
			'B'
		);
	} else if (absN >= 1000 * 1000) {
		return (
			prefix +
			(n / (1000 * 1000)).toLocaleString('en', {
				minimumFractionDigits: minFrag,
				maximumFractionDigits: maxFrag
			}) +
			'M'
		);
	} else if (absN >= 1000) {
		return (
			prefix +
			(n / 1000).toLocaleString('en', {
				minimumFractionDigits: minFrag,
				maximumFractionDigits: maxFrag
			}) +
			'k'
		);
	} else {
		return (
			prefix +
			n.toLocaleString('en', {
				minimumFractionDigits: minFrag,
				maximumFractionDigits: maxFrag
			})
		);
	}
}

export function formatPriceChange(n: number): string {
	if (!Number.isFinite(n)) return '---';
	return (
		(n > 0 ? '▲' : '▼') +
		(Math.abs(n) * 100).toLocaleString('en', {
			minimumFractionDigits: 1,
			maximumFractionDigits: 1
		}) +
		'%'
	);
}

/**
 * Format number using an English thousand separation
 * @param n
 */
export function formatAmount(n: number): string {
	if (!n) {
		return '---';
	}

	return n.toLocaleString('en');
}

/**
 * Format number using an English thousand separation
 * @param n
 */
export function formatMillion(n: number): string {
	if (!n) {
		return '---';
	}

	return (n / 1_000_000).toLocaleString('en', {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
}

/**
 * Format number using an English thousand separation
 * @param n
 */
export function formatMillion2(n: number): string {
	if (!n) {
		return '---';
	}

	return (n / 1_000_000).toLocaleString('en', {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
}

/**
 * Grabs only the domain part from the URL
 */
export function formatUrlAsDomain(u: string): string {
	const url = new URL(u);
	return url.hostname;
}

/**
 * Format a datetime string to human readable format.
 *
 * Mostly useful for formattiong ISO-8601 datetime strings coming from the backend.
 *
 */
export function formatDatetime(d: Date): string {
	const s = d.toLocaleString('en-GB', { timeZone: 'UTC' });
	return s + ' UTC';
}

/**
 * Format a USDC balance as it comes out from the contract.
 *
 *
 */
export function formatUSDCBalance(web3, b: string, decimals: number): string {
	const n = parseFloat(b);
	const val = n / Math.pow(10, decimals);
	return val.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Shorten Ethereum address
 *
 */
export function formatShortAddress(address: string): string {
	if (!address) {
		return '---';
	}

	return address.substring(0, 8) + '…';
}
