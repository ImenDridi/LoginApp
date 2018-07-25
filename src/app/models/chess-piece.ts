import { ChessPieceType } from "./chess-piece-type.enum";

/**
 * This class instances represent an actual chess piece, not the idea
 * of an piece. So for the eight white ponds we need to create eight
 * instances
 */
export class ChessPiece {
    // each piece is described by the type and the side
    constructor(
        private type: ChessPieceType,
        private side: boolean  // true white, false black    
    ) {

    }

    // since the variables are private we need the getters (or accessors) to get their values
    getSide() { return this.side; }
    getType() { return this.type; }
}
