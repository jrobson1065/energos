package co.visionaries.energos;

import co.visionaries.energos.entities.*;


import co.visionaries.energos.repositories.VisionBoardRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Populator implements CommandLineRunner {

    @Autowired
    private VisionBoardRepository visionBoardRepo;

    @Autowired
    private VisionBoardFactory visionBoardFactory;


    public void run(String... args) throws Exception {

        VisionBoard board1 = visionBoardFactory.createDefaultBoard("Travel");
        visionBoardRepo.save(board1);

        VisionBoard board2 = visionBoardFactory.createDefaultBoard("Dreams");
        visionBoardRepo.save(board2);

//        VisionBoard board3 = visionBoardFactory.createDefaultBoard("2020 Goals");
//        visionBoardRepo.save(board3);


    }

}
