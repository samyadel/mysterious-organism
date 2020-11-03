// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, strand) => {
  return {
    specimenNum: num,
    dna: strand,
    mutate() {
      let randIndex = Math.floor(Math.random() * this.dna.length);
      let newDNA = returnRandBase();

      while (this.dna[randIndex] === newDNA) {
        newDNA = returnRandBase();
      }

      this.dna[randIndex] = newDNA;

      return this.dna[randIndex];
    },
    compareDNA(pAequor) {
      let totalDNA;
      let sameDNA = 0;

      this.dna.forEach((el, i) => {
        el === pAequor.dna[i] && sameDNA++;

        totalDNA = i + 1;
      });

      const percentage = ((sameDNA / totalDNA) * 100).toFixed(2);

      console.log(
        `specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common`
      );
    },
    willLikelySurvive() {
      let totalDNA;
      let match = 0;

      this.dna.forEach((el, i) => {
        (el === "C" || el === "G") && match++;

        totalDNA = i + 1;
      });

      const percentage = (match / totalDNA) * 100;

      return percentage >= 60;
    },
  };
};

const pAequors = [];

for (let i = 0; i < 30; i++) {
  pAequors.push(pAequorFactory(i + 1, mockUpStrand()));
}
