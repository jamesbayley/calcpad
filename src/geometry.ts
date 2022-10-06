/**
 * The orthogonal axes about which flexure (i.e. bending) occurs.
 */
export type FlexuralAxis = 'X-X' | 'Y-Y';


/**
 * Represents a generic 2D geometry.
 */
export interface I2Dimensional {
    area(): number;
    perimeter(): number;
    secondMomentOfArea(rotationAbout: FlexuralAxis): number; 
}


/**
 * Represents a generic 3D geometry.
 */
export interface I3Dimensional { 
    volume(): number;
}


/**
 * A basic 2D rectangular geometry.
 */
export class Rectangle implements I2Dimensional { 
    /**
     * The geometric width (parallel to local x-axis).
     */
    public readonly width: number;

    /**
     * The geometric depth (parallel to local y-axis).
     */
    public readonly depth: number;

    /**
     * Initialise instance of a Rectangle.
     * @param width the geometric width (parallel to local x-axis).
     * @param depth the geometric depth (parallel to local y-axis).
     */
    public constructor(width: number, depth: number) {
        if (width <= 0.0) {
            throw new Error('Width must be greater than 0.');
        }

        if (depth <= 0.0) { 
            throw new Error('Depth must be greater than 0.');
        }

        this.width = width; 
        this.depth = depth;
    }

    /**
     * @returns the geometric area.
     */
    public area(): number {
        return this.width * this.depth;
    }

    /**
     * @returns the geometric perimeter.
     */
    public perimeter(): number { 
        return (2 * this.width) + (2 * this.depth);
    }

    /**
     * @param rotationAbout the axis about which the section bends.
     * @returns the geometric second moment of area about a given axis.
     */
    public secondMomentOfArea(rotationAbout: FlexuralAxis): number { 
        switch (rotationAbout) { 
            case 'X-X': {
                return this.width * Math.pow(this.depth, 3) / 12.0;
            }
            case 'Y-Y': {
                return this.depth * Math.pow(this.width, 3) / 12.0;
            }
        }
    }
}


/**
 * A basic 2D circular geometry.
 */
 export class Circle implements I2Dimensional { 
    /**
     * The geometric diameter.
     */
    public readonly diameter: number;

    /**
     * The geometric radius.
     */
    public readonly radius: number;

    /**
     * Initialise instance of a Circle.
     * @param diameter the geometric diameter.
     */
    public constructor(diameter: number) {
        if (diameter <= 0.0) {
            throw new Error('Diameter must be greater than 0.');
        }

        this.diameter = diameter;
        this.radius = this.diameter / 2.0; 
    }

    /**
     * @returns the geometric area.
     */
    public area(): number {
        return Math.PI * Math.pow(this.diameter, 2) / 4.0;
    }

    /**
     * @returns the geometric perimeter.
     */
    public perimeter(): number { 
        return Math.PI * this.diameter;
    }

    /**
     * @returns the geometric second moment of area about a given axis.
     */
    public secondMomentOfArea(_: FlexuralAxis): number { 
        return Math.PI * Math.pow(this.diameter, 4) / 64;
    }
}