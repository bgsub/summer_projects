
import { DESCENDING } from '@app/constants/general-constants';
import { HIGH_SCORES_QUERY } from '@app/constants/hight-scores-querry';
import { Score } from '@app/interfaces/scores';
import { Collection, Document,WithId,Db, MongoClient } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class DatabaseService {
    scores: Score[];
    db: Db;
    private client: MongoClient;

    
    get bestScoresCollection(): Collection<Score> {
        return this.db.collection('meilleurs_scores');
    }
    get database() {
        return this.db;
    }
    async start(){
        try {
            const client = await MongoClient.connect("mongodb+srv://yanbra:snakeproject@cluster0.ldrhllv.mongodb.net/?retryWrites=true&w=majority");
            this.client = client;
            this.db =  this.client.db();
            //// if we need to reset the database , uncomment the next line
            /*this.resetScores()*/
            if ((await this.db.collection('meilleurs_scores').countDocuments()) === 0) 
             this.populateScores();
            console.log('database connected')
        } catch(e) {
            console.log(e);
        }
    }
    async populateScores(): Promise<void> {
        const scores: Score[] = [
            {
                playerName: 'Joueur 1',
                score: 0,
            },
            {
                playerName: 'Joueur 2',
                score: 68,
            },
            {
                playerName: 'Joueur 3',
                score: 42,
            },
            
        ];

        for (const score of scores) {
            await this.db.collection('meilleurs_scores').insertOne(score);
        }
    }

    async getAScore(name: string): Promise<Score | null> {
        return this.getScore(name, this.bestScoresCollection);
    }

    async addScore(score: Score): Promise<void> {
        await this.bestScoresCollection.insertOne(score);
    }
    async deleteScore(playerName: string) {
        await this.bestScoresCollection.findOneAndDelete({ playerName });
    }

   async updateScores() {
        this.scores = await this.updateCollectionScores(this.bestScoresCollection);
    }

    private async updateCollectionScores(scoreCollection: Collection<Score>) {
        const scoresList: Score[] = [];
        await scoreCollection
            .aggregate(HIGH_SCORES_QUERY)
            .toArray()
            .then((scores: Document[]) => {
                scores.forEach((scoreCategory: Document) => {
                    scoreCategory.docs.forEach((score: Score) => {
                        scoresList.push({ playerName: score.playerName, score: score.score });
                        scoresList.sort((a, b) => (a < b ? 1 : a > b ? DESCENDING : 0));
                    });
                });
            });
        return scoresList;
    }
    async resetScores(): Promise<void> {
        this.db.collection('meilleurs_scores').drop();
        this.populateScores();
    }

    private async getScore(name: string, scoreCollection: Collection<Score>) {
        return scoreCollection.findOne({ playerName: name }).then((score: WithId<Score> | null) => {
            return score;
        });
    }

    
}

