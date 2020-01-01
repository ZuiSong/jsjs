export type ScopeType = 'function' | 'loop' | 'switch' | 'block';

export type Kind = 'const' | 'var' | 'let';

export interface Var {
    value: any

    // $call($this: any, args: Array<any>): any
}

export class ScopeVar implements Var {
    kind: Kind;

    constructor(kind: Kind, value: any) {
        this._value = value
        this.kind = kind
    }

    _value: any;

    get value(): any {
        return this._value
    }

    set value(value: any) {
        if (this.kind === 'const') {
            throw 'const variable can not reassign'
            // this._value = value
        } else {
            this._value = value
        }
    }
}

export class PropVar implements Var {
    object: any;
    property: string;

    constructor(object: any, property: string) {
        this.object = object
        this.property = property
    }

    get value() {
        return this.object[this.property]
    }

    set value(value: any) {
        this.object[this.property] = value
    }

    $delete() {
        delete this.object[this.property]
    }
}

export class Scope {
    readonly type: ScopeType;
    invasived: boolean;
    private readonly content: { [key: string]: Var };
    private readonly parent: Scope | null;
    private readonly prefix: string = '@';

    constructor(type: ScopeType, parent?: Scope, label?: string) {
        this.type = type
        this.parent = parent || null
        this.content = {}
        this.invasived = false
    }

    $find(raw_name: string): Var | null {
        const name: string = this.prefix + raw_name
        if (this.content.hasOwnProperty(name)) {
            return this.content[name]
        } else if (this.parent) {
            return this.parent.$find(raw_name)
        } else {
            return null
        }
    }

    $let(raw_name: string, value: any): boolean {
        const name: string = this.prefix + raw_name
        const $var = this.content.hasOwnProperty(name)
        if (!$var) {
            this.content[name] = new ScopeVar('let', value)
            return true
        } else {
            return false
        }
    }

    $const(raw_name: string, value: any): boolean {
        const name: string = this.prefix + raw_name
        const $var = this.content.hasOwnProperty(name)
        if (!$var) {
            this.content[name] = new ScopeVar('const', value)
            return true
        } else {
            return false
        }
    }

    $var(raw_name: string, value: any): boolean {
        const name = this.prefix + raw_name
        let scope: Scope = this

        while (scope.parent !== null && scope.type !== 'function') {
            scope = scope.parent
        }
        const $var = scope.content[name]
        if (!$var) {
            this.content[name] = new ScopeVar('var', value)
            return true
        } else {
            return false
        }
    }

    $declar(kind: Kind, raw_name: string, value: any): boolean {
        let declares = {
            var: () => this.$var(raw_name, value),
            let: () => this.$let(raw_name, value),
            const: () => this.$const(raw_name, value)
        }
        return declares[kind]()
    }
}
