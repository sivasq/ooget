import { Injectable } from '@angular/core';

interface ICfg {
	indices?: boolean;
	nulls?: boolean;
}

declare type ParamType = undefined | null;

@Injectable({
	providedIn: 'root'
})
export class ToFormDataService {

	constructor() { }

	isUndefined(value) {
		return value === undefined;
	}

	isNull(value) {
		return value === null;
	}

	isObject(value) {
		return value === Object(value);
	}

	isArray(value) {
		return Array.isArray(value);
	}

	isDate(value) {
		return value instanceof Date;
	}

	isBlob(value) {
		return (
			value &&
			typeof value.size === 'number' &&
			typeof value.type === 'string' &&
			typeof value.slice === 'function'
		);
	}

	isFile(value) {
		return (
			this.isBlob(value) &&
			(typeof value.lastModifiedDate === 'object' ||
				typeof value.lastModified === 'number') &&
			typeof value.name === 'string'
		);
	}

	isFormData(value) {
		return value instanceof FormData;
	}

	objectToFormData(obj: any, fd?: FormData, pre?: string, cfg?: ICfg | ParamType): FormData {
		cfg = cfg || {};
		cfg.indices = this.isUndefined(cfg.indices) ? false : cfg.indices;
		cfg.nulls = this.isUndefined(cfg.nulls) ? true : cfg.nulls;
		fd = fd || new FormData();

		if (this.isUndefined(obj)) {
			return fd;
		} else if (this.isNull(obj)) {
			if (cfg.nulls) {
				fd.append(pre, '');
			}
		} else if (this.isArray(obj)) {
			if (!obj.length) {
				const key = pre + '[]';

				fd.append(key, '');
			} else {
				obj.forEach(function (value, index) {
					const key = pre + '[' + (cfg.indices ? index : '') + ']';

					this.objectToFormData(value, fd, key, cfg);
				});
			}
		} else if (this.isDate(obj)) {
			fd.append(pre, obj.toISOString());
		} else if (this.isObject(obj) && !this.isFile(obj) && !this.isBlob(obj)) {
			Object.keys(obj).forEach((prop) => {
				const value = obj[prop];

				if (this.isArray(value)) {
					while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
						prop = prop.substring(0, prop.length - 2);
					}
				}

				const key = pre ? pre + '[' + prop + ']' : prop;

				this.objectToFormData(value, fd, key, cfg);
			});
		} else {
			fd.append(pre, obj);
		}

		return fd;
	}

	objectToFormDataSimple(formData, object) {
		Object.keys(object).forEach(key => formData.append(key, object[key]));
		return formData;
	}
}
