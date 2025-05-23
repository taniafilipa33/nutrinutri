module Api
    class Api::AppointmentsController < ApplicationController
        before_action :set_appointment, only: [ :update]
        
        def index
            @appointments = Appointment.all
            render json: @appointments
        end
        
         
        def create
            @guest = Guest.find_by(email: params[:email])
            if @guest.nil? 
                newgguest= {}
                newgguest[:name] = params[:name]
                newgguest[:email] = params[:email] 
                @guest = Guest.create(newgguest)
            end       
            newappoint = {}
            newappoint[:guest_id] = @guest.id
            newappoint[:status] = "pending"
            newappoint[:service_id] =  params[:service_id]

            newappoint[:requested_date] = params[:requested_date]
            @appointment = Appointment.new(newappoint)
            if @appointment.save
                render json: @appointment, status: :created
            else 
                render json: @appointment.errors, status: :unprocessable_entity
            end    
        end

        def update
            puts "AQUI DEBUGERE #{params}"
            @appointment =  Appointment.find(params[:id])

            if(appointment_params[:status] == "accepted")
                #guest appointsme ts of the same guest at the sime datetime
                @appointments = Appointment.where(guest_id: @appointment.guest_id, status: 'pending', requested_date:@appointment.requested_date)
                #reject them all
                @appointments.each do |appointment|
                    appointment.update(status: 'rejected')
                end
            end
            if @appointment.update(appointment_params)
                #warn guest by email
                ApplicationMailer.appointment_answered(@appointment).deliver_later
              render json: @appointment
            else
                render json: @appointment.errors, status: :unprocessable_entity
            end    
        end


        def search
            query = params[:status]
            if query.present?
              appointment = Appointment.where("status ILIKE ?", "%#{query}%")
              render json: appointment, include: [:service, :guest]
            else
              render json: { error: "No query provided" }, status: :bad_request
            end
        end

   

        def only_one_pending
            # Check if the guest exists
         
            @guest = Guest.find_by(email: params[:email])
            if !@guest.nil?
                if Appointment.exists?(guest_id: @guest.id, status: 'pending')
                    render json: { message: 'You already one pending request' }, status: :conflict
                else render json: { message: 'No pending appointment found.' }, status: :ok    
                end
            end
        end
        private
            #  ????
        def set_appointment
            @appointment = Appointment.find(params[:id])
        end

            # Only allow a list of trusted parameters through. TIPO VALIDATOR NO LARAVEL
        def appointment_params
            params.require(:appointments).permit( :status)
        end
    end         
end