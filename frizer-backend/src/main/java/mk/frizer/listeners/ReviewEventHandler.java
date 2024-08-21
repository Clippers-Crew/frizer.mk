package mk.frizer.listeners;

import mk.frizer.domain.Review;
import mk.frizer.domain.Salon;
import mk.frizer.domain.events.ReviewCreatedEvent;
import mk.frizer.domain.events.ReviewDeletedEvent;
import mk.frizer.domain.events.ReviewEditedEvent;
import mk.frizer.service.SalonService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ReviewEventHandler {
    private final SalonService salonService;

    public ReviewEventHandler(SalonService salonService) {
        this.salonService = salonService;
    }

    @EventListener
    public void onReviewCreated(ReviewCreatedEvent event) {
        Review review = (Review) event.getSource();
        salonService.addReview(review);
    }

    @EventListener
    public void onReviewDeleted(ReviewDeletedEvent event) {
        Review review = (Review) event.getSource();
        salonService.deleteReview(review);
    }

    @EventListener
    public void onReviewEdited(ReviewEditedEvent event){
        Review review = (Review) event.getSource();
        salonService.updateReview(review, event.getOldRating());
    }
}
